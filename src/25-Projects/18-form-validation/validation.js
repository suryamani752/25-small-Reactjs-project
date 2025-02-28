import * as yup from "yup";

export const schema = yup.object().shape({
  username: yup.string().required("Username is required").min(3).max(20),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Requires uppercase letter")
    .matches(/[0-9]/, "Requires number")
    .matches(/[^A-Za-z0-9]/, "Requires special character"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
