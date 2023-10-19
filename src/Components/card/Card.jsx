import React, {useContext} from "react";
import "./styles.css";
import { ThemeContext } from "../../App";

function Card(props) {
  const { image, title, AddToFavourites } = props;
  const {theme} = useContext(ThemeContext);

  function handleClick() {
    AddToFavourites();
  }

  return (
    <div style={theme ? {border:"3px solid #040d5e"}:{}} className="card">
      <img src={image} alt="recipee" />
      <p style={theme ? {color: "#040d5e"}:{}}>{title}</p>
      <button style={theme ? {backgroundColor: "#040d5e", border: "none"}:{}} onClick={handleClick}>Add To Favourites</button>
    </div>
  );
}

export default Card;
