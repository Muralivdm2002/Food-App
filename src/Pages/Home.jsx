import React, { useContext, useEffect, useReducer, useState } from "react";
import Search from "../Components/Search";
import "./styles.css";
import Card from "../Components/card/Card";
import Favourites from "../Components/card/Favourites";
import { ThemeContext } from "../App";


const initialValue = {
  filterValue: ''
}

function reducer(state,action){
  switch (action.type) {
    case 'filter':
      return{
        ...state,
        filterValue: action.value
      }
    
    default:
      return state;
  }
}

function Home() {
  //state for loading
  const [loading, setLoading] = useState(false);

  //state for recipees
  const [recipees, setRecipees] = useState([]);

  //state for favourites
  const [favourites, setFavourites] = useState([]);

  //state for checking API call Success
  const [apiCallState, setApiCallState] = useState(false);

  //state for searching favs:
  const [filtered,dispatch] = useReducer(reducer,initialValue)

  const{theme} = useContext(ThemeContext);

  //Fetch data from the API:
  function getSearchData(data) {
    setLoading(true);

    async function fetchData() {
      const apiFetch = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=e613ee2dc28240e8b0d87cf8de5842fe&query=${data}`
      );
      const result = await apiFetch.json();
      const { results } = result;

      //adding recipees
      if (results && results.length > 0) {
        setLoading(false);
        setRecipees(results);
        setApiCallState(true);
      } else {
        setLoading(false);
        alert("no results found");
      }
    }
    fetchData();
  }

  //Add to Favourite Function
  function AddToFavourites(getCurrentItem) {
    let favouritesCopy = [];

    if (favourites != null) {
      favouritesCopy = [...favourites];
    }

    //checking wether it's already exists or not
    const checkIndex = favouritesCopy.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (checkIndex === -1) {
      favouritesCopy.push(getCurrentItem);
      setFavourites(favouritesCopy);
    } else {
      alert("You already added this item in the Favourites");
    }

    localStorage.setItem("favourites", JSON.stringify(favouritesCopy));
    window.scrollTo({top:'0' , behavior: "smooth"})
  }

  //Remove from favourites
  function removeFromFav(getId) {
    let copyFavs = [];

    if (favourites != null) {
      copyFavs = [...favourites];
    }

    const newCopyFavs = copyFavs.filter((item) => item.id !== getId);

    setFavourites(newCopyFavs);
    localStorage.setItem("favourites", JSON.stringify(newCopyFavs));
  }

  //Getting data from the localstorage:
  useEffect(() => {
    const localFavourites = JSON.parse(localStorage.getItem("favourites"));
    setFavourites(localFavourites);
  }, []);

  let filteredFav;

  if(favourites){
    filteredFav = favourites.filter(item => item.title.toLowerCase().includes(filtered.filterValue.toLowerCase()));
  }

  return (
    <div>
      {/*Search Box */}
      <Search
        apiCallState={apiCallState}
        setApiCallState={setApiCallState}
        getSearchData={getSearchData}
      />

      {/*Show Favourites*/}
      <div className="favouriteContainer">
        <div style={theme?{color: "white"}: {}} className="favouriteHeader">Favourites</div>
        <div className="favSearch">
          <input
            onChange={(event) => dispatch({type:'filter' , value: event.target.value})}
            type="text"
            placeholder="Search Favourites"
          />
        </div>
        <div className="favourites">
          {filteredFav && filteredFav.length > 0
            ? filteredFav.map((favItem) => {
                return (
                  <Favourites
                    removeFromFav={() => removeFromFav(favItem.id)}
                    key={favItem.id}
                    image={favItem.image}
                    title={favItem.title}
                  />
                );
              })
            : null}
        </div>
      </div>

      {/*Show Loader*/}
      {loading && <div className="loading">Loading Recipees...</div>}

      {/*Show Results*/}
      {
        <div>
          <div id="recipee">
            {recipees && recipees.length > 0 ? (
              <div>
                <div className="recipeeHead">Your Results</div>
                <div className="recipeeContainer">
                  {recipees.map((item) => {
                    return (
                      <Card
                        key={item.id}
                        AddToFavourites={() => AddToFavourites(item)}
                        image={item.image}
                        title={item.title}
                      />
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      }
    </div>
  );
}

export default Home;
