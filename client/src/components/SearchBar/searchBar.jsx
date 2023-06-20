import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import { getCountryByName } from '../../redux/countrySlice';

const SearchBar = () => {
  const URL = 'http://localhost:3001/countries';
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
      setSearch(e.target.value.trim());
    }
  };

  useEffect(() => {
    setError('');
    const handleSearch = async () => {
      try {
        const { data } = await axios(`${URL}?name=${search}`);
        dispatch(getCountryByName(data));
      } catch (error) {
        setError(error.message);
      }
    };
    handleSearch();
  }, [search]);

  return (
    <div>
      <div>
        <input
          placeholder="nombre de un pais"
          id="input-field"
          type='search'
          value={search}
          onChange={handleChange}
        />
        {error && <p>No hay Pais con el nombre!</p>}
      </div>
    </div>
  );
};

export default SearchBar;