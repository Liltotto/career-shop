import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {setIsLoading, setPassword, setUser, setIsErrorInvalidUser} from 'features/authentication/model/userSlice';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return function handleLogin(email: string, password : string) {
        const auth = getAuth();
        dispatch(setIsLoading(true))
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {      
                dispatch(setUser({
                    email: user.email!,
                    id: user.uid,
                    token: user.refreshToken,
                }));
            })
            .then(() => {
                dispatch(setPassword(password));
                navigate('/profile')
            })
            .catch(() => dispatch(setIsErrorInvalidUser(true)))
            .finally(() => dispatch(setIsLoading(false)))
    }
}