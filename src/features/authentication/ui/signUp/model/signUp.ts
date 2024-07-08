import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {setIsLoading, setUser} from 'features/authentication/model/userSlice';

export const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return function handleRegister (email: string, password : string) {

        dispatch(setIsLoading(true))

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                
                dispatch(setUser({
                    email: user.email!,
                    id: user.uid,
                    token: user.refreshToken,
                }));
                navigate('/login');
            })
            .catch(console.error)
            .finally(() => dispatch(setIsLoading(false)))
    }
}