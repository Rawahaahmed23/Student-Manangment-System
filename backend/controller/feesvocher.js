const PDFDocument = require("pdfkit");
const archiver = require("archiver");
const path = require("path");
const Student = require("../schema/StudentSchema");

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const LOGO_PATH = path.join(__dirname, "./assets/LOGO.png");

const generateVoucherBuffer = (student) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A5", margin: 40 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const pageWidth = doc.page.width - 80;

    doc
      .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
      .lineWidth(1.5)
      .strokeColor("#e2e8f0")
      .stroke();

    let logoLoaded = false;
    try {
      const fs = require("fs");
      if (fs.existsSync(LOGO_PATH)) {
        doc.image(LOGO_PATH, 40, 20, {
          fit: [40, 40],
          align: "left",
          valign: "center",
        });
        logoLoaded = true;
      }
    } catch (e) {
      console.warn("Logo load nahi hua:", e.message);
    }

    const textStartX = logoLoaded ? 88 : 40;
    const textWidth = logoLoaded ? pageWidth - 48 : pageWidth;
    const nameAlign = logoLoaded ? "left" : "center";

    doc
      .fillColor("#1e293b")
      .fontSize(15)
      .font("Helvetica-Bold")
      .text("Iqra Taleem o Tabiat ul Atfal", textStartX, 28, {
        width: textWidth,
        align: nameAlign,
      });

    doc
      .fillColor("#64748b")
      .fontSize(9)
      .font("Helvetica")
      .text("Fee Voucher", textStartX, 50, {
        width: textWidth,
        align: nameAlign,
      });

    doc
      .moveTo(40, 80)
      .lineTo(doc.page.width - 40, 80)
      .lineWidth(0.5)
      .dash(4, { space: 4 })
      .strokeColor("#cbd5e1")
      .stroke()
      .undash();

    const today = new Date().toLocaleDateString("en-PK", {
      day: "2-digit", month: "short", year: "numeric",
    });
    const dueDate = new Date(Date.now() + 30 * 864e5).toLocaleDateString("en-PK", {
      day: "2-digit", month: "short", year: "numeric",
    });

    doc
      .fillColor("#64748b")
      .fontSize(8)
      .font("Helvetica")
      .text(`Voucher No: GR-${String(student.GrNumber).padStart(3, "0")}`, 40, 88)
      .text(`Issue Date: ${today}`, 40, 100)
      .text(`Due Date: ${dueDate}`, doc.page.width - 160, 88)
      .text(`Academic Year: ${new Date().getFullYear()}`, doc.page.width - 160, 100);

    doc
      .rect(40, 118, pageWidth, 22)
      .fillColor("#f8fafc")
      .fill();

    doc
      .fillColor("#1e293b")
      .fontSize(9)
      .font("Helvetica-Bold")
      .text("STUDENT INFORMATION", 48, 125);

    const infoRow = (label, value, y) => {
      doc
        .fillColor("#64748b")
        .fontSize(9)
        .font("Helvetica")
        .text(label, 48, y);
      doc
        .fillColor("#1e293b")
        .fontSize(9)
        .font("Helvetica-Bold")
        .text(value ?? "—", 180, y);
    };

    infoRow("Student Name", student.StudentName, 153);
    infoRow("Father Name", student.FatherName, 170);
    infoRow("GR Number", `GR-${String(student.GrNumber).padStart(3, "0")}`, 187);
    infoRow("Class", `Class ${student.Class}`, 204);
    infoRow("Gender", student.Gender, 221);

    doc
      .moveTo(40, 240)
      .lineTo(doc.page.width - 40, 240)
      .lineWidth(0.5)
      .strokeColor("#e2e8f0")
      .stroke();

    doc
      .rect(40, 245, pageWidth, 22)
      .fillColor("#f8fafc")
      .fill();

    doc
      .fillColor("#1e293b")
      .fontSize(9)
      .font("Helvetica-Bold")
      .text("FEE DETAILS", 48, 252);

    doc
      .fillColor("#64748b")
      .fontSize(9)
      .font("Helvetica")
      .text("Monthly Fee", 48, 279);

    doc
      .fillColor("#1e293b")
      .fontSize(9)
      .font("Helvetica-Bold")
      .text(`Rs. ${Number(student.MonthlyFee).toLocaleString()}`, 180, 279);

    doc
      .rect(40, 307, pageWidth, 40)
      .fillColor("#1e293b")
      .fill();

    doc
    .fillColor("#ffffff")
      .fontSize(12)
      .font("Helvetica")
      .text("TOTAL AMOUNT DUE", 48, 319);

    doc
      .fillColor("#f1f5f9")
      .fontSize(16)
      .font("Helvetica-Bold")
      .text(
        `Rs. ${Number(student.MonthlyFee).toLocaleString()}`,
        doc.page.width - 180,
        317
      );

    doc
      .fillColor("#94a3b8")
      .fontSize(7.5)
      .font("Helvetica")
      .text(
        "Please present this voucher at the school office. Valid for current month only.",
        40,
        365,
        { width: pageWidth, align: "center" }
      );

    doc.end();
  });
};


const generateSingleVoucher = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)
      return res.status(404).json({ success: false, message: "Student not found" });

    const pdfBuffer = await generateVoucherBuffer(student);

    const fileName = `Voucher_GR${String(student.GrNumber).padStart(3, "0")}_${student.StudentName.replace(/\s+/g, "_")}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error("Single voucher error:", err);
    res.status(500).json({ success: false, message: "Failed to generate voucher" });
  }
};


const generateAllVouchers = async (req, res) => {
  try {
    const students = await Student.find();
    if (!students.length)
      return res.status(404).json({ success: false, message: "No students found" });

    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="FeeVouchers_${new Date().getFullYear()}.zip"`
    );

    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", (err) => {
      console.error("Archiver error:", err);
      res.status(500).json({ success: false, message: "Failed to create ZIP" });
    });

    archive.pipe(res);

    for (const student of students) {
      const pdfBuffer = await generateVoucherBuffer(student);
      const fileName = `GR${String(student.GrNumber).padStart(3, "0")}_${student.StudentName.replace(/\s+/g, "_")}.pdf`;
      const folderName = `Class_${student.Class}`;
      archive.append(pdfBuffer, { name: `${folderName}/${fileName}` });
    }

    await archive.finalize();
  } catch (err) {
    console.error("All vouchers error:", err);
    res.status(500).json({ success: false, message: "Failed to generate vouchers" });
  }
};

const generateVouchersByMonthYear = async (req, res) => {
  try {
    const { id } = req.params; // ← student ID route se
    const month = parseInt(req.body.month || req.query.month);
    const year  = parseInt(req.body.year  || req.query.year);

    if (!month || !year || month < 1 || month > 12 || year < 2000 || year > 2100) {
      return res.status(400).json({
        success: false,
        message: "Valid month (1-12) aur year (e.g. 2025) dena zaroori hai",
      });
    }

    const student = await Student.findById(id); // ← sirf ek student
    if (!student)
      return res.status(404).json({ success: false, message: "Student not found" });

    const monthName = MONTHS[month - 1];
    const pdfBuffer = await generateVoucherBuffer(student, month, year);
    const fileName = `Voucher_GR${String(student.GrNumber).padStart(3, "0")}_${student.StudentName.replace(/\s+/g, "_")}_${monthName}_${year}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.send(pdfBuffer);

  } catch (err) {
    console.error("Month/Year voucher error:", err);
    res.status(500).json({ success: false, message: "Voucher generate karne mein error" });
  }
};
module.exports = { generateSingleVoucher, generateAllVouchers,generateVouchersByMonthYear };