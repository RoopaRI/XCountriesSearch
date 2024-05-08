import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CountriesSearch.css"

function CountriesSearch() {
  const [flags, setFlags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setFlags(response.data); // Set the entire array of country data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredCountries = flags.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  },[]);

  return (
    <div>
        <div className="topnav">
            <input
                className="Search"
                type="text"
                placeholder="Search for countries"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            />
        </div>
        <div className="countries">
            {filteredCountries.map((country) => (
                    <div className="countryCard" key={country.alpha3Code}>
                        <img src={country.flags.png} alt={country.flags.alt} />
                        <h2>{country.name.common}</h2>
                    </div>
            ))}
        </div>
    </div>   
  );
}

export default CountriesSearch;