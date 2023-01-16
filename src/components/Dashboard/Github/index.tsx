import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getRepos, RepoI } from "../../../store/reducers/github-repo";
import TextInput from "../../Inputs/TextInput";

interface ParamsGetReposI {
  username: string;
}
const SearchRepo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { repos } = useSelector((state: DefaultRootState) => state.repos);
  const handleLoadRepo = (value: ParamsGetReposI) => {
    dispatch(getRepos(value.username));
  };

  return (
    <div className="shadow-md max-w-7xl mx-auto p-4 mt-6 space-y-2 ">
      <Formik initialValues={{ username: "" }} onSubmit={handleLoadRepo}>
        {({ values, handleSubmit, handleChange }) => {
          return (
            <form onSubmit={handleSubmit} className="flex">
              <TextInput
                name={"username"}
                value={values.username}
                onChange={handleChange}
                type={undefined}
                classWrapper="w-3/4"
                placeholder="Name"
                classAttr={
                  "h-full appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm"
                }
                onBlur={undefined}
              />
              <button
                type="submit"
                className="ml-3 w-1/4 border p-2 bg-green-100 border-green-200 text-green-700"
              >
                Load Repos
              </button>
            </form>
          );
        }}
      </Formik>
      <div className="flex-auto p-4">
        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
          {repos.map((repo: RepoI) => {
            return (
              <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
                {repo.full_name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchRepo;
