import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Shoe.css";
import { selectShoeById, useDeleteShoeMutation } from "./shoesApiSlice";

const Shoe = ({ shoe }) => {

  const [
    deleteShoe,
  ] = useDeleteShoeMutation();

  const onDeleteShoeClicked = async () => {
    await deleteShoe({ id: shoe.id });
  };

  const date = new Date(shoe.release_date);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();

  return (
    <div className="singleShoe">
      <Link className="shoenamelink" to={`/shoes/${shoe.id}`}>
        <h2>{shoe.shoeName}</h2>
      </Link>
      <Link className="shoenamelinkonimg" to={`/shoes/${shoe.id}`}>
        <img src={shoe.img_url} alt="Shoe img" className="img"></img>
      </Link>
      <div className="date-shoe">
        <div className="date__month">{month}</div>
        <div className="date__year">{year}</div>
        <div className="date__day">{day}</div>
      </div>
      { <button
        className="deleteshoebutton"
        type="button"
        onClick={onDeleteShoeClicked}
      >
        Delete shoe
      </button>}
    </div>
  );
};

export default Shoe;
