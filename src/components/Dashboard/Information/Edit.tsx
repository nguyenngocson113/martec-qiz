import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { updateUser, UserI } from "../../../store/reducers/user";
import TextInput from "../../Inputs/TextInput";
import PasswordInput from "../../Inputs/PasswordInput";
import registerSchema from "../../Register/schemaValidation";
import { FC } from "react";
import { InformationI } from "./View";

const INPUT_STYLES =
  "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm";

const InformationEdit: FC<InformationI> = ({ user, onEdit }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleEdit = (values: UserI) => {
    dispatch(updateUser(values));
    onEdit(false);
  };

  return (
    <div className="shadow-md max-w-7xl mx-auto p-4 mt-6 space-y-2 relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
        <div className="flex flex-wrap -mx-3">
          <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
            <h6 className="mb-0">Profile Information</h6>
          </div>
        </div>
      </div>
      <div className="flex-auto p-4">
        <hr className="h-px my-6 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent" />
        <Formik
          initialValues={{ ...user, confirmPassword: user.password }}
          onSubmit={handleEdit}
          validationSchema={registerSchema}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            dirty,
            errors = {} as Record<string, string>,
          }) => {
            const {
              lastName = "",
              firstName = "",
              email = "",
              phone = "",
              password = "",
              confirmPassword = "",
            } = values;

            return (
              <form onSubmit={handleSubmit}>
                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                  <li className="flex flex-row gap-2 w-full px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
                    <TextInput
                      name={"firstName"}
                      value={firstName}
                      onChange={handleChange}
                      nameError={errors.firstName}
                      classWrapper="flex-grow"
                      classAttr={INPUT_STYLES}
                      label={"First Name"}
                    />
                    <TextInput
                      name={"lastName"}
                      value={lastName}
                      onChange={handleChange}
                      nameError={errors.lastName}
                      classWrapper="flex-grow"
                      classAttr={INPUT_STYLES}
                      label={"Last Name"}
                    />
                  </li>
                  <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                    <TextInput
                      name={"phone"}
                      value={phone}
                      onChange={handleChange}
                      nameError={errors.phone}
                      classAttr={INPUT_STYLES}
                      label={"Phone"}
                    />
                  </li>
                  <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                    <TextInput
                      name={"email"}
                      value={email}
                      onChange={handleChange}
                      nameError={errors.email}
                      classAttr={INPUT_STYLES}
                      label={"Email"}
                    />
                  </li>
                  <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                    <PasswordInput
                      name={"password"}
                      value={password}
                      onChange={handleChange}
                      nameError={errors.password}
                      classWrapper="flex justify-end items-center relative"
                      classAttr={INPUT_STYLES}
                      label={"Password"}
                    />
                  </li>
                  <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                    <PasswordInput
                      name={"confirmPassword"}
                      value={confirmPassword}
                      onChange={handleChange}
                      nameError={errors.confirmPassword}
                      classWrapper="flex justify-end items-center relative"
                      classAttr={INPUT_STYLES}
                      label={"Confirm Password"}
                    />
                  </li>
                </ul>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="border p-2 bg-green-100 border-green-200 text-green-700"
                    disabled={!dirty}
                  >
                    Save Information
                  </button>

                  <button
                    type="button"
                    className="ml-3 border p-2 bg-red-100 border-red-200 text-red-700"
                    onClick={() => onEdit(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default InformationEdit;
