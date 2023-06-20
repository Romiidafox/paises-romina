import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
  getCountries,
  orderByAtoZ,
  orderByPopulation,
  filterByContinent,
  filterByActivity
} from '../../redux/countrySlice';

import SearchBar from "../SearchBar/searchBar";

const NavBar = () => {
  const activities = useSelector(state => state.country.activities);

  const names = activities.map(activity => activity.name);
  const setOfNames = new Set(names);
  const activitiesNames = Array.from(setOfNames);

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const URL = 'http://localhost:3001/countries';

  const getallCountries = async () => {
    try {
      const { data } = await axios(URL);
      dispatch(getCountries(data));
    } catch (error) {
      throw error.message;
    }
  };

  const handleOrderByAtoZ = (event) => {
    dispatch(orderByAtoZ(event.target.value));
  };

  const handleOrderByPopulation = (event) => {
    dispatch(orderByPopulation(event.target.value));
  };

  const handleFilterbyContinent = (event) => {
    event.target.value !== 'All' ? dispatch(filterByContinent(event.target.value))
      : getallCountries();
  };

  const handleFilterbyActivity = (event) => {
    event.target.value !== 'No Activity' ? dispatch(filterByActivity(event.target.value))
      : getallCountries();
  };

  return (
    <div>
      <div>
        <Link to='/home'>
          <button onClick={() => getallCountries()}>Volver</button>
        </Link>
      </div>

      <div>
        {pathname === '/home' ? <SearchBar /> : null}
      </div>

      <div>
        {pathname === '/home' ?
          <div>
            <select name="alphabetical" onChange={handleOrderByAtoZ}>
              <option selected disabled>Ordenar por alfabeto</option>
              <option value="A">De la A a la Z</option>
              <option value="D">De la Z a la A</option>
            </select>
          </div>
          : null
        }

        {pathname === '/home' ?
          <div>
            <select name="population" onChange={handleOrderByPopulation}>
              <option selected disabled>Ordenar por Poblacion</option>
              <option value="A">Menor Poblacion </option>
              <option value="D">Mayor Poblacion</option>
            </select>
          </div>
          : null
        }
      </div>

      <div>
        {pathname === '/home' ?
          <div>
            <select name="continents" onChange={handleFilterbyContinent}>
              <option selected disabled>Filtrar por Continentes</option>
              <option value="Europe">Europa</option>
              <option value="Oceania">Oceania</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="South America">Sur America</option>
              <option value="North America">Norte America</option>
              <option value="Antarctica">Antarctica</option>
              <option value="All">Todo el Mundo</option>
            </select>
          </div>
          : null
        }

        <div>
          {pathname === '/home' && activitiesNames.length > 0 ?
            <select name="activities" onChange={handleFilterbyActivity}>
              <option selected disabled>Filtrar por Actividades</option>
              {activitiesNames.map((name) => (
                <option key={name} value={name}>
                  {name.slice(0, 1).toUpperCase() + name.slice(1)}
                </option>
              ))}
              <option value="No Activity">Sin actividad</option>
            </select>
            : null
          }
        </div>
      </div>

      {pathname !== '/activity' ?
        <div>
          <Link to='/activity'>
            <button>Crear Actividad</button>
          </Link>
        </div>
        : null
      }
    </div>
  );
};

export default NavBar;