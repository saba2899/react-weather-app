import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

function App() {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // აქ მოგვიანებით დავამატებთ API-ის გამოძახებას
  };

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;
