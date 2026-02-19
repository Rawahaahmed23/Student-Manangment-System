const yup = require("yup");

// Signup Schema
const signupSchema = yup.object({
  username: yup.string()
    .required("Username is required")
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name must not be more than 255 characters"),

  email: yup.string()
    .required("Email is required")
    .trim()
    .email("Invalid email address"),

  password: yup.string()
    .required("Password is required")
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(1024, "Password must not be more than 1024 characters"),
});

// Login Schema
const loginSchema = yup.object({
  username: yup.string()
    .required("Username is required")
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(255, "Username must not be more than 255 characters"),

  password: yup.string()
    .required("Password is required")
    .trim()
    .min(6, "Password must be at least 6 characters"),
});

module.exports = { signupSchema, loginSchema };
