const PDFDocument = require("pdfkit");
const archiver = require("archiver");
const Student = require("../schema/StudentSchema"); 
const path = require("path");

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

    doc
      .rect(20, 20, doc.page.width - 40, 80)
      .fillColor("#1e293b")
      .fill();


    doc
      .fillColor("#f1f5f9")
      .fontSize(16)
      .font("Helvetica-Bold")
      .text("Iqra Tarbiyat Ul Atfal", 40, 38, { width: pageWidth, align: "center" });

    doc
      .fillColor("#94a3b8")
      .fontSize(9)
      .font("Helvetica")
      .text("Fee Payment Voucher", 40, 60, { width: pageWidth, align: "center" });


    doc
      .moveTo(40, 115)
      .lineTo(doc.page.width - 40, 115)
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
      .text(`Voucher No: GR-${String(student.GrNumber).padStart(3, "0")}`, 40, 122)
      .text(`Issue Date: ${today}`, 40, 134)
      .text(`Due Date: ${dueDate}`, doc.page.width - 160, 122)
      .text(`Academic Year: ${new Date().getFullYear()}`, doc.page.width - 160, 134);

    // ── Section: Student Info ─────────────────────────────────────────────────
    doc
      .rect(40, 155, pageWidth, 22)
      .fillColor("#f8fafc")
      .fill();

    doc
      .fillColor("#1e293b")
      .fontSize(9)
      .font("Helvetica-Bold")
      .text("STUDENT INFORMATION", 48, 162);

    // Info rows helper
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

    infoRow("Student Name", student.StudentName, 188);
    infoRow("Father Name", student.FatherName, 205);
    infoRow("GR Number", `GR-${String(student.GrNumber).padStart(3, "0")}`, 222);
    infoRow("Class", `Class ${student.Class}`, 239);
    infoRow("Gender", student.Gender, 256);
 

    // ── Divider ───────────────────────────────────────────────────────────────
    doc
      .moveTo(40, 295)
      .lineTo(doc.page.width - 40, 295)
      .lineWidth(0.5)
      .strokeColor("#e2e8f0")
      .stroke();

    // ── Section: Fee Details ──────────────────────────────────────────────────
    doc
      .rect(40, 300, pageWidth, 22)
      .fillColor("#f8fafc")
      .fill();

    doc
      .fillColor("#1e293b")
      .fontSize(9)
      .font("Helvetica-Bold")
      .text("FEE DETAILS", 48, 307);

    // Fee row
    doc
      .fillColor("#64748b")
      .fontSize(9)
      .font("Helvetica")
      .text("Monthly Fee", 48, 334)
   

    doc
      .fillColor("#1e293b")
      .fontSize(9)
      .font("Helvetica-Bold")
      .text(`Rs. ${Number(student.MonthlyFee).toLocaleString()}`, 180, 334);

    // Fee status badge

  
    doc
   
      .fontSize(8)
      .font("Helvetica-Bold")
  

    // ── Total box ─────────────────────────────────────────────────────────────
    doc
      .rect(40, 378, pageWidth, 40)
      .fillColor("#1e293b")
      .fill();

    doc
      .fillColor("#94a3b8")
      .fontSize(9)
      .font("Helvetica")
      .text("TOTAL AMOUNT DUE", 48, 385);

    doc
      .fillColor("#f1f5f9")
      .fontSize(16)
      .font("Helvetica-Bold")
      .text(`Rs. ${Number(student.MonthlyFee).toLocaleString()}`, doc.page.width - 180, 382);

    // ── Footer note ───────────────────────────────────────────────────────────
    doc
      .fillColor("#94a3b8")
      .fontSize(7.5)
      .font("Helvetica")
      .text(
        "Please present this voucher at the school office. Valid for current month only.",
        40,
        435,
        { width: pageWidth, align: "center" }
      );

    doc.end();
  });
};

// ─── Route 1: Single student voucher ─────────────────────────────────────────
// GET /fee/voucher/:id
const generateSingleVoucher = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

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
    res.setHeader("Content-Disposition", `attachment; filename="FeeVouchers_${new Date().getFullYear()}.zip"`);

    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", (err) => {
      console.error("Archiver error:", err);
      res.status(500).json({ success: false, message: "Failed to create ZIP" });
    });

    archive.pipe(res);

    // Har student ka PDF banao aur class folder mein rakho
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

module.exports = { generateSingleVoucher, generateAllVouchers };