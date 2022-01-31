import React, {useEffect, useState} from 'react'
import "./SearchPage.css"
import Autocomplete from "./Autocomplete"
import axios from "axios"
export const SearchPage = () => {
   const [data, setData] = useState({  });
   const [error, setError] = useState(false)
   const [query,setQuery] = useState("");


   const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(query)
     
    }
   const handleChange = e =>{
      //e.preventDefault();
      setQuery(e.target.value);
      console.log(query)
    }

   useEffect(async () => {
      let result;
        result = await axios(
          'https://restcountries.com/v3.1/all',
        );
      var arr = [];
      console.log(result)
        Object.keys(result.data).forEach(function(key) {
          arr.push(result.data[key].name.common);
          //console.log(arr)
        });
      setData(arr);

      console.log(arr);
    },[]);
   return (
     <>
      <div className="searchpage-container">
         <div className="searchpage-title">
            <h3>Country generator</h3>
            <div className="searchpage-underline"></div>
         </div>
         <form className="searchpage-container-inputContainer" onSubmit={handleSubmit}>
            <Autocomplete onChange={handleChange} suggestions={data}/>
            
            <button className="searchpage-button" type='submit' >Search</button>
         </form>
      </div>
     </>
   )
}

export default SearchPage;