import React from "react";
import './styles.css';
import { ThemeContext } from "../../App";
import { useContext } from "react";


function ThemeSwitch(){

    const{theme,setTheme} = useContext(ThemeContext);

    function handleClick(){
        setTheme(!theme);
    }
    console.log(theme);

    return(
        <button onClick={handleClick} style={theme ? {backgroundColor: "#040d5e", border: "none"}:{}} id="themeButton">Change Theme</button>
    )
}

export default ThemeSwitch;