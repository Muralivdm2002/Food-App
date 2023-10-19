import React, { useContext } from "react";
import "./styles.css";
import { ThemeContext } from "../../App";

function Favourites(props) {
  const { image, title, removeFromFav} = props;
  const {theme} = useContext(ThemeContext)

  return (
    <div style={theme ? {backgroundColor: "#040d5e", border: "3px solid white"}:{}} className="Favcard">
      <img src={image} alt="recipee" />
      <p>{title}</p>
      <button style={theme ? {color: "#040d5e", border: "none"}:{}} onClick={removeFromFav}>Remove From Favourites</button>
    </div>
  );
}

export default Favourites;
