import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CountryCard from '../CountryCard/countryCard';

const countriesPerPage = 10;
const visiblePageButtons = 5;

const HomePage = () => {
    const allcountries = useSelector(state => state.country.allCountries);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setTotalPages(Math.ceil(allcountries.length / countriesPerPage));
        setPage(0);
    }, [allcountries]);

    if (allcountries.length === 0) {
        return <h1>Loading Countries ...</h1>;
    }

    const renderPageButtons = () => {
        const startPage = Math.max(0, Math.min(page - Math.floor(visiblePageButtons / 2), totalPages - visiblePageButtons));
        const endPage = Math.min(startPage + visiblePageButtons, totalPages);

        return Array.from({ length: endPage - startPage }).map((_, i) => {
            const pageNumber = startPage + i;
            const buttonClass = pageNumber === page ? 'selectedPageButton' : 'pageButton'; // Apply different styles to the selected page
            return (
                <button className={buttonClass} key={pageNumber} onClick={() => setPage(pageNumber)}>{pageNumber + 1}</button>
            );
        });
    };

    return (
        <div>
            <div>
                {page > 0 && (
                    <button key={'<<'} className="pageButton" onClick={() => setPage(0)}>{'<<'}</button>
                )}
                {renderPageButtons()}
                {page < totalPages - 1 && (
                    <button key={'>>'} className="pageButton" onClick={() => setPage(totalPages - 1)}>{'>>'}</button>
                )}
            </div>

            <div>
                {allcountries.slice(0 + (page * countriesPerPage), countriesPerPage + (page * countriesPerPage)).map(({ id, name, continents, flags }) => (
                    <CountryCard
                        id={id}
                        key={id + ' ' + name}
                        name={name}
                        continents={continents}
                        flags={flags}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;