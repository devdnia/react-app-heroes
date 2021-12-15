import { useEffect, useReducer } from "react"
import { AppRouter } from "./routers/AppRouter"
import { AuthContext } from "./auth/authContext"
import { authReducer } from "./auth/authReducer"


const init = () =>{
    // Devuelvo el 'user' y si no exite logged: false
    return JSON.parse( localStorage.getItem('user') ) || { logged: false }
}

export const HeroesApp = () => {
    
    const [ user , dispatch ] = useReducer( authReducer, {}, init );

    useEffect(() => {
        if ( !user ) return;
        localStorage.setItem('user', JSON.stringify( user ));
    }, [ user ])
    
    return (
        <AuthContext.Provider value={{
            user,
            dispatch
        }}>
            <AppRouter />
        </AuthContext.Provider>
    )
}
