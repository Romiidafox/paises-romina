import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <h1>Paises by Romina Anahi Bustos</h1>
            <Link to='/home'>
                <button>A VIAJAR POR EL MUNDO!!</button>
            </Link>
        </div>
    );
};

export default LandingPage;