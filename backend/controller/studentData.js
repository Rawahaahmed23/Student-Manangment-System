const Student = require('../schema/StudentSchema')

const PDFDocument = require("pdfkit");


const archiver = require("archiver");


const moment = require('moment'); 

const AddStudent = async (req, res) => {
  try {
    const {
      GrNumber, StudentName, FatherName,
      Class, Gender, DateOfBirth,
      DateOfAdmission, MonthlyFee, PhoneNumber, WhatsAppNumber
    } = req.body;

    // Duplicate check
    const existingStudent = await Student.findOne({ GrNumber });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

  



    const student = new Student({
      GrNumber,
      StudentName,
      FatherName,
      Class,
      paidMonths: [],  
      Gender,
      DateOfBirth: moment(DateOfBirth, 'YYYY-MM-DD').toDate(),
      DateOfAdmission: moment(DateOfAdmission, 'YYYY-MM-DD').toDate(),
      MonthlyFee,
       PhoneNumber, 
       WhatsAppNumber
  
    });

    await student.save();
    res.status(201).json({ message: "Student Added Successfully", student });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




const deleteStudent = async (req, res) => {
  try {
    const { _id } = req.params;
    const student = await Student.findById(_id);
    
    if (!student) {
      return res.status(400).json({ message: 'Student Not Found' });
    }


    await Student.findByIdAndDelete(_id);
    return res.status(200).json({ message: 'Student Deleted Successfully' });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};








const EditStudent = async (req, res) => {
  try {
    const { _id } = req.params;

    const student = await Student.findById(_id);
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    const {
      GrNumber, StudentName, FatherName, Class, Gender,
      DateOfBirth, DateOfAdmission, MonthlyFee, FeeStatus,
      LastFeeUpdate, profileImage , PhoneNumber, WhatsAppNumber
    } = req.body;

    if (GrNumber && GrNumber !== student.GrNumber) {
      const existing = await Student.findOne({ GrNumber });
      if (existing) {
        return res.status(400).json({ message: "GrNumber already exists" });
      }
    }

    if (profileImage?.public_id && profileImage.public_id !== student.profileImage?.public_id) {
      if (student.profileImage?.public_id) {
      await bucket.file(student.profileImage.public_id).delete();
      }
    }

    const updatedData = {
      ...(GrNumber && { GrNumber }),
      ...(StudentName && { StudentName }),
      ...(FatherName && { FatherName }),
      ...(Class && { Class }),
      ...(Gender && { Gender }),
      ...(DateOfBirth && { DateOfBirth }),
      ...(DateOfAdmission && { DateOfAdmission }),
      ...(MonthlyFee !== undefined && { MonthlyFee }),
      ...(FeeStatus && { FeeStatus }),
      ...(LastFeeUpdate && { LastFeeUpdate }),
      ...(PhoneNumber !== undefined && { PhoneNumber }),
...(WhatsAppNumber !== undefined && { WhatsAppNumber }),

    };

    const updatedStudent = await Student.findByIdAndUpdate(
      _id,
      { $set: updatedData },
      { new: true }
    );

    return res.status(200).json({ message: "Student Updated Successfully", student: updatedStudent });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const students = await Student.find();  
    const now = new Date();

    const updatedStudents = students.map((student) => {
 

      let feeStatus = student.feeStatus || "Unpaid";

     
      if (student.nextDueDate && now > new Date(student.nextDueDate)) {
        feeStatus = "Unpaid";
      }

      return {
        ...student._doc,
        feeStatus
      };
    });

    res.status(200).json({
      success: true,
      data: updatedStudents
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




const generateClassPDFBuffer = (cls, studentsInClass) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", layout: "landscape", margin: 0 });
    const chunks = [];

    doc.on("data",  (chunk) => chunks.push(chunk));
    doc.on("end",   () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const PAGE_W = doc.page.width;   // 841.89
    const PAGE_H = doc.page.height;  // 595.28
    const M      = 30;
    const TW     = PAGE_W - M * 2;

    const ROW_H      = 30;   // ⬆ bara
    const HEADER_H   = 44;   // ⬆ bara
    const COL_HEAD_H = 26;   // ⬆ bara

    const COLS = [
      { label: "GR #",         w: TW * 0.07  },
      { label: "Student Name", w: TW * 0.19  },
      { label: "Father Name",  w: TW * 0.18  },
      { label: "Gender",       w: TW * 0.07  },
      { label: "DOB",          w: TW * 0.12  },
      { label: "Admission",    w: TW * 0.12  },
      { label: "Monthly Fee",  w: TW * 0.12  },
      { label: "Status",       w: TW * 0.13  },
    ];

    const ROWS_PER_PAGE = Math.floor(
      (PAGE_H - M * 2 - HEADER_H - COL_HEAD_H - 20) / ROW_H
    );

    const fmt = (d) => {
      try {
        return new Date(d).toLocaleDateString("en-PK", {
          day: "2-digit", month: "short", year: "numeric",
        });
      } catch { return "N/A"; }
    };

    const today = new Date().toLocaleDateString("en-PK", {
      day: "2-digit", month: "long", year: "numeric",
    });

    const colX = (idx) => {
      let x = M;
      for (let i = 0; i < idx; i++) x += COLS[i].w;
      return x;
    };

    const clip = (text, maxW) => {
      let t = String(text ?? "");
      while (t.length > 1 && doc.widthOfString(t) > maxW - 10) t = t.slice(0, -1);
      return t.length < String(text ?? "").length ? t + "…" : t;
    };

    const drawHeader = () => {
      doc.rect(M, M, TW, HEADER_H).fillColor("#1e293b").fill();

      doc.fillColor("#f1f5f9").font("Helvetica-Bold").fontSize(15)
        .text(`Student Register — Class ${cls}`, M + 16, M + 10, { lineBreak: false });

      doc.fillColor("#64748b").font("Helvetica").fontSize(9.5)
        .text(
          `${studentsInClass.length} students  ·  Generated: ${today}  ·  Confidential`,
          M + 16, M + 28, { lineBreak: false }
        );
    };

    const drawColHeaders = (y) => {
      doc.rect(M, y, TW, COL_HEAD_H).fillColor("#f1f5f9").fill();

      doc.moveTo(M, y).lineTo(M + TW, y)
        .lineWidth(0.5).strokeColor("#cbd5e1").stroke();
      doc.moveTo(M, y + COL_HEAD_H).lineTo(M + TW, y + COL_HEAD_H)
        .lineWidth(0.5).strokeColor("#cbd5e1").stroke();

      doc.fillColor("#475569").font("Helvetica-Bold").fontSize(9.5);
      COLS.forEach((col, i) => {
        doc.text(col.label.toUpperCase(), colX(i) + 8, y + 8, { lineBreak: false });
      });
    };

    const drawFooter = (pageNum, totalPages) => {
      const fy = PAGE_H - M - 14;
      doc.moveTo(M, fy).lineTo(M + TW, fy)
        .lineWidth(0.3).strokeColor("#e2e8f0").stroke();
      doc.fillColor("#94a3b8").font("Helvetica").fontSize(8)
        .text(`School Management System  ·  Class ${cls} Register  ·  ${today}`, M, fy + 4, { lineBreak: false });
      doc.text(`Page ${pageNum} / ${totalPages}`, M + TW - 60, fy + 4, { lineBreak: false });
    };

    const drawVerticalDividers = (fromY, toY) => {
      let lx = M;
      COLS.forEach((col) => {
        lx += col.w;
        doc.moveTo(lx, fromY).lineTo(lx, toY)
          .lineWidth(0.3).strokeColor("#e2e8f0").stroke();
      });
    };

    const totalPages = Math.max(1, Math.ceil(studentsInClass.length / ROWS_PER_PAGE));

    for (let p = 0; p < totalPages; p++) {
      if (p > 0) doc.addPage();

      const chunk    = studentsInClass.slice(p * ROWS_PER_PAGE, (p + 1) * ROWS_PER_PAGE);
      const colHeadY = M + HEADER_H + 2;
      let   rowY     = colHeadY + COL_HEAD_H;

      drawHeader();
      drawColHeaders(colHeadY);

      chunk.forEach((s, i) => {
        doc.rect(M, rowY, TW, ROW_H)
          .fillColor(i % 2 === 0 ? "#ffffff" : "#f8fafc")
          .fill();

        const values = [
          `GR-${String(s.GrNumber).padStart(3, "0")}`,
          s.StudentName,
          s.FatherName,
          s.Gender,
          fmt(s.DateOfBirth),
          fmt(s.DateOfAdmission),
          `Rs. ${Number(s.MonthlyFee).toLocaleString()}`,
          s.feeStatus ?? "Pending",
        ];

        values.forEach((val, ci) => {
          const cx  = colX(ci);
          const cw  = COLS[ci].w;
          const cy  = rowY + ROW_H / 2 - 5;

          if (ci === 7) {
            // ── Status — sirf colored text, koi badge nahi ──
            const status = String(val);
            const colorMap = {
              Paid:    "#16a34a",  // green
              Unpaid:  "#dc2626",  // red
              Pending: "#d97706",  // amber
            };
            const color = colorMap[status] ?? "#64748b";
            doc.fillColor(color).font("Helvetica-Bold").fontSize(10)
              .text(status, cx + 8, cy, { lineBreak: false });
          } else {
            const isBold = ci === 0 || ci === 6;
            doc.fillColor("#1e293b")
              .font(isBold ? "Helvetica-Bold" : "Helvetica")
              .fontSize(10)
              .text(clip(val, cw), cx + 8, cy, { lineBreak: false });
          }
        });

        doc.moveTo(M, rowY + ROW_H).lineTo(M + TW, rowY + ROW_H)
          .lineWidth(0.3).strokeColor("#e2e8f0").stroke();

        rowY += ROW_H;
      });

      drawVerticalDividers(colHeadY, rowY);

      doc.rect(M, colHeadY, TW, rowY - colHeadY)
        .lineWidth(0.5).strokeColor("#cbd5e1").stroke();

      drawFooter(p + 1, totalPages);
    }

    doc.end();
  });
};

const generateStudentsPDF = async (req, res) => {
  try {
    const students = await Student.find().sort({ Class: 1, GrNumber: 1 });
    if (!students.length)
      return res.status(404).json({ message: "No students found" });

    const grouped = {};
    students.forEach((s) => {
      if (!grouped[s.Class]) grouped[s.Class] = [];
      grouped[s.Class].push(s);
    });

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="StudentRegister_${new Date().getFullYear()}.zip"`);

    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", (err) => {
      console.error("Archiver error:", err);
      res.status(500).json({ message: "Failed to create ZIP" });
    });

    archive.pipe(res);

    for (const cls of Object.keys(grouped)) {
      const pdfBuffer = await generateClassPDFBuffer(cls, grouped[cls]);
      archive.append(pdfBuffer, { name: `Class_${cls}/students-class${cls}.pdf` });
    }

    await archive.finalize();

  } catch (err) {
    console.error("generateStudentsPDF error:", err);
    res.status(500).json({ message: "Failed to generate ZIP" });
  }
};



module.exports = {
    AddStudent,
    deleteStudent,
    EditStudent,
    getStudent,
generateStudentsPDF
}