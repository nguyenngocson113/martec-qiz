import { useState } from "react";
import { useSelector } from "react-redux";
import { UserStateI } from "store/reducers/user";
import Edit from "./Edit";
import View from "./View";

const Information = () => {
  const { user }: UserStateI = useSelector(
    (state: DefaultRootState) => state.user
  );

  const [isEditMode, setEditMode] = useState<boolean>(false);

  if (isEditMode) return <Edit user={user} onEdit={setEditMode} />;

  return <View user={user} onEdit={setEditMode} />;
};

export default Information;
