import { useState } from "react";
import { useSelector } from "react-redux";
import { UserStateI } from "../../store/reducers/user";
import Github from "./Github";
import Edit from "./Information/Edit";
import View from "./Information/View";

const Dashboard = () => {
  const { user }: UserStateI = useSelector(
    (state: DefaultRootState) => state.user
  );

  const [isEditMode, setEditMode] = useState<boolean>(false);

  return (
    <>
      {!isEditMode ? (
        <View user={user} onEdit={setEditMode} />
      ) : (
        <Edit user={user} onEdit={setEditMode} />
      )}
      <Github />
    </>
  );
};

export default Dashboard;
