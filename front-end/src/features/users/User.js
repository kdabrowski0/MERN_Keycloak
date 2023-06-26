import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

const User = () => {
  const { id } = useParams();
  const user = useSelector((state) => selectUserById(state, id));

  const navigate = useNavigate();

  return (
    <div>
      <p>current user: {user.username}</p>
    </div>
  );
};
export default User;
