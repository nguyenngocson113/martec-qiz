import Button from "components/Inputs/Button";
import { useDispatch, useSelector } from "react-redux";
import reposReducer, { RepoI } from "store/reducers/github-repo";

const Result = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { repos } = useSelector((state: DefaultRootState) => state.repos);

  const handleShare = (id: number) => {
    dispatch(reposReducer.actions.share({ id }));
  };
  return (
    <div className="flex-auto p-4">
      <ul className="grid gap-x-8 gap-y-4 grid-cols-4 pl-0 mb-0 rounded-lg">
        {repos.map((repo: RepoI) => {
          return (
            <li
              key={repo.id}
              className="flex px-4 py-2 pt-0 pl-0 leading-normal border-0 text-sm text-inherit"
            >
              <div className="flex flex-col">
                <div className="mt-auto mb-auto">
                  <strong>Name:</strong> {repo.name}
                </div>
                <div className="mt-auto mb-auto">
                  <strong>Language:</strong> {repo.language}
                </div>
                <div className="mt-auto mb-auto">
                  <strong>Share:</strong> {repo.share || 0}
                </div>
              </div>

              <Button
                icon="share"
                color="none"
                outline={false}
                onClick={() => handleShare(repo.id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Result;
