import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";

function App() {
  const [searchedCity, setSearchCity] = useState(null);
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    setSearchCity(query);
    // აქ მოგვიანებით დავამატებთ API-ის გამოძახებას
  };

  return ( 
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
      {searchedCity && <SearchResult city={searchedCity}/>}
    </div>
  );
}

export default App;
