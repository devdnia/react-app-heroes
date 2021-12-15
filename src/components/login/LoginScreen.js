import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';



export const LoginScreen = () => {

    const navigate = useNavigate();
    const { dispatch } = useContext( AuthContext );



    const handleLogin = ()=>{
     
        const action = {
            type: types.login,
            payload: { name: 'Ivan' }
        }

        dispatch( action );

        const lastPath = localStorage.getItem('lastPath') || '/marvel';


        // Mediante el replace: true no podré volver atrás
        navigate(lastPath, {
            replace: true
        });
    }

    return (
        <div className="cointaner mt-5 px-5">
            <h1>Login</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={ handleLogin }
            >
                Login
            </button>
        </div>
    )
}