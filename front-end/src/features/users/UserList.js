import { useGetUsersQuery, useDeleteUserMutation } from "./usersApiSlice";
import { selectAllUsers } from "./usersApiSlice";
import { useSelector } from "react-redux";

const UserList = () => {
  const {  error } = useGetUsersQuery();
  const users = useSelector(selectAllUsers);
  const [deleteUser] = useDeleteUserMutation();

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}
            <button onClick={() => deleteUser( { id: user.id } )}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;