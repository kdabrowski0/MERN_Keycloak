import { store } from "../../app/store";
import { shoesApiSlice } from "../shoes/shoesApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { usersApiSlice } from "../users/usersApiSlice";

const Prefetch = () => {
  useEffect(() => {
    const shoes = store.dispatch(shoesApiSlice.endpoints.getShoes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      shoes.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
