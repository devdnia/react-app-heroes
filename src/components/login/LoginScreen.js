import { useNavigate } from 'react-router-dom';

export const LoginScreen = () => {

    const navigate = useNavigate();

    const handleLogin = ()=>{
        // Mediante el replace: true no podré volver atrás
        navigate('/marvel', {
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