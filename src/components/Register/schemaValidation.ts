import { isEmpty } from "lodash";
import * as Yup from "yup";

const registerSchema = Yup.object().shape(
  {
    phone: Yup.string()
      .trim()
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Invalid format")
      .when("email", {
        is: (email: string) => isEmpty(email),
        then: Yup.string().required("Field is required"),
      }),
    email: Yup.mixed().when(["phone"], {
      is: (phone: string) => isEmpty(phone),
      then: Yup.string().email().required("Field is required"),
    }),
    password: Yup.string()
      .min(12, "Password must be 12 characters long")
      .matches(/[0-9]/, "Invalid format")
      .matches(/[a-z]/, "Invalid format")
      .matches(/[A-Z]/, "Invalid format")
      .matches(/[^\w]/, "Invalid format")
      .required("Field is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Field is required"),
  },
  [["phone", "email"]]
);

export default registerSchema;
