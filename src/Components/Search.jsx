import React, { useContext, useEffect } from "react";
import "./styles.css";
import { useState } from "react";
import { ThemeContext } from "../App";

function Search(props) {
  const [food, setFood] = useState("");
  const { getSearchData, apiCallState, setApiCallState } = props;
  const {theme} = useContext(ThemeContext);

  function handleChange(event) {
    const { value } = event.target;
    setFood(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getSearchData(food);
  }

  useEffect(() => {
    if(apiCallState){
      setApiCallState(false);
      setFood('');
    }
  },[apiCallState,setApiCallState])

  return (
    <form onSubmit={handleSubmit} className="search">
      <input
        type="text"
        name="text"
        value={food}
        onChange={handleChange}
        placeholder="Enter A food Name"
      />
      <input id="submit" type="submit" style={theme? {backgroundColor: '#040d5e'}: {}} value="Search" />
    </form>
  );
}

export default Search;
