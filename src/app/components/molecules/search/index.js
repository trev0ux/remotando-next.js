import { useState } from 'react';
import fetch from 'isomorphic-fetch';
import InputText from "../../atoms/inputText";

const Search = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    const data = await res.json();
    setResults(data);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      search();
    }
  };

  const handleSelect = (location) => {
    onSelect(location);
    setQuery(''); // Clear the input field after selecting a location
    setResults([]); // Clear the results list after selecting a location
  };

  return (
    <div>
      <InputText
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyPress} // Trigger search on "Enter" key press
        placeholder="Search for a location"
      />
      <ul>
        {results.map((result) => (
          <li key={result.place_id} onClick={() => handleSelect(result)}>
            {result.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
