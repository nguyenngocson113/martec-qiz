import classNames from "classnames";
import { ReactComponent as EditIcon } from "public/images/edit.svg";
import { FC } from "react";
import { UserI } from "store/reducers/user";
import Classes from "./classes";

export interface InformationI {
  user: UserI;
  onEdit: (isEdit: boolean) => void;
}

const Information: FC<InformationI> = ({ user, onEdit }) => {
  const { lastName, firstName, email = "_", phone = "_" } = user as UserI;

  return (
    <div className="shadow-md max-w-7xl mx-auto p-4 mt-6 space-y-2 relative flex flex-col h-full min-w-0 break-words border-0 shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
        <div className="flex flex-wrap -mx-3">
          <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
            <h6 className="mb-0">Profile Information</h6>
          </div>
          <div className="w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none">
            <button
              data-target="tooltip_trigger"
              data-placement="top"
              onClick={() => onEdit(true)}
            >
              <EditIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-auto p-4">
        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
          <li className={classNames(Classes.viewElementClasses)}>
            <strong className="text-slate-700">Full Name:</strong> &nbsp;{" "}
            {firstName} {lastName}
          </li>
          <li className={classNames(Classes.viewElementClasses)}>
            <strong className="text-slate-700">Mobile:</strong> &nbsp; {phone}
          </li>
          <li className={classNames(Classes.viewElementClasses)}>
            <strong className="text-slate-700">Email:</strong> &nbsp;
            {email}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Information;
