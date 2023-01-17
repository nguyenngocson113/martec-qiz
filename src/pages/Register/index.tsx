import classNames from "classnames";
import Button from "components/Inputs/Button";
import TextInput from "components/Inputs/TextInput";
import { Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "store/reducers/register";
import { UserI } from "store/reducers/user";
import Classes from "./classes";
import registerSchema from "./schemaValidation";

interface UserRegister extends UserI {
  confirmPassword: string;
}
const Register = () => {
  const { isSuccess, isLoading } = useSelector(
    (state: DefaultRootState) => state.register
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    navigate("/login");
  }, [isSuccess]);

  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = (values: UserRegister) => {
    dispatch(registerUser(values));
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
              Create new account
            </h2>
          </div>
          <Formik
            initialValues={{} as UserRegister}
            onSubmit={onSubmit}
            validationSchema={registerSchema}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              errors = {} as Record<string, string>,
              values: {
                firstName = "",
                lastName = "",
                email = "",
                phone = "",
                password = "",
                confirmPassword = "",
              } = {} as UserRegister,
            }) => {
              return (
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <input type="hidden" name="remember" value="true" />
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <TextInput
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        nameError={errors.firstName}
                        placeholder="First Name"
                        classAttr={classNames(
                          "rounded-t-md",
                          Classes.inputClasses
                        )}
                      />
                    </div>
                    <div>
                      <TextInput
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        nameError={errors.lastName}
                        placeholder="Last Name"
                        classAttr={classNames(Classes.inputClasses)}
                      />
                    </div>
                    <div>
                      <TextInput
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        nameError={errors.email}
                        placeholder="Email"
                        classAttr={classNames(Classes.inputClasses)}
                      />
                    </div>
                    <div>
                      <TextInput
                        type="phone"
                        name="phone"
                        value={phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        nameError={errors.phone}
                        placeholder="Phone"
                        classAttr={classNames(Classes.inputClasses)}
                      />
                    </div>
                    <div>
                      <TextInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        nameError={errors.password}
                        placeholder="Password"
                        classAttr={classNames(Classes.inputClasses)}
                      />
                    </div>
                    <div>
                      <TextInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        nameError={errors.confirmPassword}
                        placeholder="Confirm Password"
                        classAttr={classNames(
                          "rounded-b-md",
                          Classes.inputClasses
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="text-sm">
                      <Link
                        to="/login"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Already have an account?
                      </Link>
                    </div>
                  </div>

                  <Button type="submit" text="Register" isLoading={isLoading} />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
