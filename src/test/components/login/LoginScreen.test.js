import { mount } from "enzyme";
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";


const mockNavigate = jest.fn();

jest.mock('react-router-dom', ()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: ()=> mockNavigate
}));


describe('Pruebas en <LoginScreen />', () => {

    const contextValue = {
        dispatch : jest.fn(),
        user:{
            logged: false,
        }
    }
   
    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={['/login'] }>
                <Routes>
                    <Route path="/login" element={<LoginScreen />}/>
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('debe mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de realizar el dispatch y la navegación', () => {
        
       const handleClick =  wrapper.find( 'button' ).prop( 'onClick' );
       handleClick();

       // dispatch ( ...{ name: Ivan });
       expect( contextValue.dispatch ).toHaveBeenCalledWith({
           type: types.login,
           payload: { name: 'Ivan' }
       })

       // mockNavigate = (/marvel {replace: true})
       expect( mockNavigate ).toBeCalledWith('/marvel', { replace: true });

       // localstorage.setItem('lastPath', '/dc)
        localStorage.setItem('lastPath', '/dc');
        handleClick();

        // mockNavigate = (/dc {replace: true})
        expect( mockNavigate ).toBeCalledWith('/dc', { replace: true });

    });
    
    
});
