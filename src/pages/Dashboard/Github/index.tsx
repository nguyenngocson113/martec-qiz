import Result from "./RepoList";
import SearchRepos from "./SearchRepos";

const Github = () => {
  return (
    <div className="shadow-md max-w-7xl mx-auto p-4 mt-6 space-y-2 ">
      <SearchRepos />
      <Result />
    </div>
  );
};

export default Github;
