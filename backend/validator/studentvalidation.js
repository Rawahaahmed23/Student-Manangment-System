const yup = require("yup");

// Reusable Pakistani phone number regex
// Accepts: 0300-1234567 | 03001234567 | +923001234567 | 092-300-1234567
const phoneRegex = /^(\+92|0092|0)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{7}$/;

const studentValidationSchema = yup.object({

  GrNumber: yup
    .number()
    .typeError("GR Number must be a number")
    .required("GR Number is required")
    .positive()
    .integer(),

  StudentName: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Student Name should contain only alphabets")
    .required("Student Name is required"),

  FatherName: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Father Name should contain only alphabets")
    .required("Father Name is required"),

  Class: yup
    .string()
    .typeError("Class must be a number")
    .required("Class is required"),

  Gender: yup
    .string()
    .oneOf(["Male", "Female", "Other"])
    .required("Gender is required"),

  DateOfBirth: yup
    .date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of Birth is required"),

  DateOfAdmission: yup
    .date()
    .min(
      yup.ref("DateOfBirth"),
      "Admission date cannot be before date of birth"
    )
    .required("Date of Admission is required"),

  MonthlyFee: yup
    .number()
    .typeError("Monthly Fee must be a number")
    .required("Monthly Fee is required")
    .positive(),


  PhoneNumber: yup
    .string()
    .nullable()
    .transform((value) => value === "" ? null : value)
    .matches(phoneRegex, "Enter a valid Pakistani phone number (e.g. 0300-1234567)")
    .optional(),

  WhatsAppNumber: yup
    .string()
    .nullable()
    .transform((value) => value === "" ? null : value)
    .matches(phoneRegex, "Enter a valid Pakistani WhatsApp number (e.g. 0300-1234567)")
    .optional(),
});

module.exports = studentValidationSchema;