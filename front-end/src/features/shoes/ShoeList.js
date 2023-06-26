import React, { useState } from "react";
import Shoe from "./Shoe";
import "./ShoeList.css";
import { useGetShoesQuery} from "./shoesApiSlice";
import { useDebounce } from 'use-debounce';


const ShoeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [value] = useDebounce(searchTerm, 400);
  const {
    data: shoes,
    isLoading: getshoeloading,
    isSuccess: getshoesucces,
    isError: getshoeerror,
    error,
  } = useGetShoesQuery(value);

 
  let content;
  if (getshoeloading) content = <p>Loading...</p>;
  if (getshoeerror) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (getshoesucces) {
    const {entities} = shoes
    const allshoes = Object.values(entities)
    const content = allshoes
      ? allshoes.map((shoe) => <Shoe key={shoe.id} shoe={shoe} />)
      : null;

    return (
      <div>
        <div className="shoelistdesc">
          <h1>Sneaker Releases</h1>
          <p>
            Find every sneaker release for the hottest sneakers from Nike,
            Adidas,
            <br></br>Off-White, Yeezy and other brands. The best and limited
            sneakers can
            <br></br>be found clearly at my page. Check out my release calendar
            for all
            <br></br>upcoming sneaker releases below!
          </p>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by shoe name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="shoeList">{content}</div>
      </div>
      
    );
  }
};

export default ShoeList;
