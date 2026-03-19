const Student = require('../schema/StudentSchema')
const puppeteer = require("puppeteer");




const markpaid = async (req, res) => {
  try {
    const { id } = req.params;
    const { months } = req.body;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 🔥 check already paid months
    const alreadyPaid = months.filter((m) =>
      student.paidMonths.includes(m)
    );

    if (alreadyPaid.length > 0) {
      return res.status(400).json({
        message: `These months are already paid: ${alreadyPaid.join(", ")}`,
      });
    }

   
    const unpaidMonths = student.totalMonths.filter(
      (m) => !student.paidMonths.includes(m)
    );

    const validMonths = months.filter((m) =>
      unpaidMonths.includes(m)
    );

    student.paidMonths.push(...validMonths);

    
    if (student.paidMonths.length >= student.totalMonths.length) {
      student.paidMonths = [];
    }

    student.LastFeeUpdate = new Date();

    await student.save();

    res.json({
      message: "Payment successful",
      paidMonths: student.paidMonths,
      unpaidMonths: student.totalMonths.filter(
        (m) => !student.paidMonths.includes(m)
      ),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const Unpaid = async (req, res) => {
  try {
    const { id } = req.params;
    const { months } = req.body;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 🔥 check karo month paid hai ya nahi
    const notPaidMonths = months.filter(
      (m) => !student.paidMonths.includes(m)
    );

    if (notPaidMonths.length > 0) {
      return res.status(400).json({
        message: `These months are already unpaid: ${notPaidMonths.join(", ")}`,
      });
    }

    // 🔥 remove months from paidMonths
    student.paidMonths = student.paidMonths.filter(
      (m) => !months.includes(m)
    );

    student.LastFeeUpdate = new Date();

    await student.save();

    res.json({
      message: "Months marked as unpaid",
      paidMonths: student.paidMonths,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { markpaid,Unpaid };