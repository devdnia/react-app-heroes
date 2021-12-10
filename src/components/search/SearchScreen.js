import { useNavigate, useLocation } from "react-router-dom";
import  queryString  from 'query-string';

import { useMemo } from "react";
import { useForm } from "../../hooks/useForm";
import { getHeroByName } from "../../selectors/getHeroByName";
import { HeroCard } from "../hero/HeroCard";



export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const  query = queryString.parse( location.search );
    const { q ='' } = query;

    const [ {searchText}, handleInputChange ]= useForm({
        searchText: q,
    });

    const heroesFileted = useMemo(() => getHeroByName( q ), [q])

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`?q=${ searchText }`);
    }


    return (
        <>
            <h1>Búsquedas</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Buscar</h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text"
                            placeholder="Buscar un héroe"    
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value= { searchText }
                            onChange={ handleInputChange }
                        />

                        <button 
                            className="btn btn-outline-primary mt-1"
                            type="submit"

                        >
                            
                            Buscar....
                        </button>
                    </form>

                </div>
                <div className="col-7">
                    <h4>Resultados</h4>
                    <hr />
                    {
                        (q === '')
                            ? <div className="alert alert-info"> Buscar un héroe </div>
                            : ( heroesFileted.length === 0 ) 
                                && <div className="alert alert-danger">No hay resultados { q} </div>
                    }

                    {
                        heroesFileted.map( heroe => (
                            <HeroCard 
                                key={ heroe.id }
                                {... heroe }
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}