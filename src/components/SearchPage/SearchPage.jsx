import React, {useEffect, useState} from 'react'
import "./SearchPage.css"
import axios from "axios"
export const SearchPage = () => {
   const [data, setData] = useState({  });
   const [error, setError] = useState(false)
   const [query,setQuery] = useState("");
   const handleSubmit = (e) => {
      e.preventDefault()
      try {
         const user = {
           name: this.state.name
         }
         axios.post('https://jsonplaceholder.typicode.com/users', { user })
           .then(res=>{
             console.log(res);
             console.log(res.data);
             window.location = "/retrieve" //This line of code will redirect you once the submission is succeed
           })
      } catch (error) {
        setError(true)
        console.log(error)
      }
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
      
      setData(result.data);
      console.log(result.data);
    },[]);
   return (
      <div className="searchpage-container">
         <div className="searchpage-title">
            <h3>Country generator</h3>
            <div className="searchpage-underline"></div>
         </div>
         <form className="searchpage-container-inputContainer" onSubmit={handleSubmit}>
            <input type="text" 
                  name="query" 
                  className="searchpage-input" 
                  placeholder="Type in country e.g Spain "
                  onChange={handleChange}/>
            <button className="searchpage-button" type='submit' >Search</button>
         </form>
      </div>
   )
}

export default SearchPage;