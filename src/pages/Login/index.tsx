import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Button from "components/Inputs/Button";
import TextInput from "components/Inputs/TextInput";
import { Formik } from "formik";
import { isEmpty } from "lodash";
import { loginUser, UserI, UserStateI } from "store/reducers/user";

const loginSchema = Yup.object().shape(
  {
    phone: Yup.string()
      .trim()
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/)
      .when("email", {
        is: (email: string) => isEmpty(email),
        then: Yup.string().required("Field is required"),
      }),
    email: Yup.mixed().when(["phone"], {
      is: (phone: string) => isEmpty(phone),
      then: Yup.string().email().required("Field is required"),
    }),
  },
  [["phone", "email"]]
);

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isSuccess, isLoading }: UserStateI = useSelector(
    (state: DefaultRootState) => state.user
  );

  useEffect(() => {
    if (!isSuccess) return;
    navigate("/");
  }, [isSuccess]);

  const onSubmit = (values: UserI) => {
    dispatch(loginUser(values));
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-gray-100 p-8 rounded shadow-lg">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <Formik
            initialValues={{}}
            validationSchema={loginSchema}
            onSubmit={onSubmit}
          >
            {({
              values: { email = "", password = "", phone = "" } = {} as UserI,
              errors = {} as Record<string, string>,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <TextInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    nameError={errors.email}
                    placeholder={"Please enter your email address."}
                    classAttr={
                      "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    }
                  />
                  <TextInput
                    type="phone"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    nameError={errors.phone}
                    placeholder={"Please enter your phone."}
                    classAttr={
                      "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    }
                  />
                  <TextInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    nameError={errors.password}
                    placeholder={"Please enter your password."}
                    classAttr={
                      "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    }
                  />
                </div>

                <Button type="submit" text="Sign In" isLoading={isLoading} />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
