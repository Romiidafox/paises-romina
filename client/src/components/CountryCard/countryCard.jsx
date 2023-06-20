import { Link } from "react-router-dom";

const CountryCard = ({ id, name, flags, continents }) => {
    return (
        <div className="card">
            <Link to={`/details/${id}`} className="nameLink">
                <div>
                    <img src={flags} alt={`Bandera de ${name}`} className="cimage" />
                </div>
                <div>
                    <h2>{name}</h2>
                    <h2>{continents}</h2>
                </div>
            </Link>
        </div>
    );
};

export default CountryCard;