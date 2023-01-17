import Button from "components/Inputs/Button";
import TextInput from "components/Inputs/TextInput";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getRepos } from "store/reducers/github-repo";
import * as Yup from "yup";

interface ParamsGetReposI {
  username: string;
}

const searchRepoSchema = Yup.object().shape({
  username: Yup.string().trim().required("User Name is required."),
});

const SearchRepos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: DefaultRootState) => state.repos);

  const handleLoadRepo = (value: ParamsGetReposI) => {
    dispatch(getRepos(value.username));
  };

  return (
    <Formik
      initialValues={{ username: "" }}
      onSubmit={handleLoadRepo}
      validationSchema={searchRepoSchema}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        errors: { username: usernameError } = {},
      }) => {
        return (
          <form onSubmit={handleSubmit} className="flex flex-wrap">
            <TextInput
              name="username"
              value={values.username}
              onChange={handleChange}
              nameError={usernameError}
              classWrapper="w-3/4"
              placeholder="Name"
              classAttr={
                "w-full appearance-none rounded-md relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm"
              }
            />
            <div className="w-1/4">
              <Button
                type="submit"
                className="ml-3 rounded-md"
                text="Load Repos"
                isLoading={isLoading}
              />
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default SearchRepos;
