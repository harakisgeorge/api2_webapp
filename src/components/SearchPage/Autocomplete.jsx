import { useState } from "react";
import "./Autocomplete.css"
import axios from "axios"

const AutoComplete = ({ suggestions }) => {
   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
   const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
   const [showSuggestions, setShowSuggestions] = useState(false);
   const [input, setInput] = useState("");
   const [error, setError] = useState(false)
   const [name,setName] = useState("");
   const [flag,setFlag] = useState("");
   const [nativeName,setNativeName] = useState("");
   const [capital,setCapital] = useState("");
   const [population,setPopulation] = useState("");


   //Component for the suggestions list
   const SuggestionsListComponent = () => {
     //Basically print out all 
      return filteredSuggestions.length ? (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;
            // Flag the active suggestion with a class
            if (index === activeSuggestionIndex) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    };
   const onClick = (e) => {
      setFilteredSuggestions([]);
      setInput(e.target.innerText);
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
    };


   const onChange = async (e) => {
      const userInput = e.target.value;

      // Filter our suggestions that don't contain the user's input
      const unLinked = suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
  
      setInput(e.target.value);
      setFilteredSuggestions(unLinked);
      setActiveSuggestionIndex(0);
      setShowSuggestions(true);

      try {
         
        let result;
        result = await axios.get(
          'https://restcountries.com/v2/name/'+userInput )
        console.log(result)
        
        setName(result.data[0].name)
        setFlag(result.data[0].flag)
        setNativeName(result.data[0].nativeName)
        setCapital(result.data[0].capital)
        setPopulation(result.data[0].population)

        console.log(name+" "+flag+" "+nativeName+" "+capital+" "+population)

      } catch (error) {
        setError(true)
        console.log(error)
      }
    };

    
   return (
      <div class="autocomplete-container">
        <div className="grid-autocomplete"> 
          <input
          type="text"
          onChange={onChange}
          value={input}
          className="autocomplete-input"
          />
          {showSuggestions && input && <SuggestionsListComponent />}
        </div>
        {name!="" &&
          
          <div className='results-container'>
              <img src={flag} />
              <h1>{nativeName}</h1>
              <h3>{capital}</h3>
              <h4>Population: {population}</h4>
          </div>        
        }
      </div>
  );
 
  
};
export default AutoComplete;