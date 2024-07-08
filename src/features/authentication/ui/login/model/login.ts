import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {setIsLoading, setPassword, setUser} from 'features/authentication/model/userSlice';
// import { useAuth } from 'features/authentication/lib/hooks/use-auth';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //const {password} = useAuth();

    return function handleLogin(email: string, password : string) {
        const auth = getAuth();
        dispatch(setIsLoading(true))
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user);
               
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
            .catch(() => alert('Invalid user!'))
            .finally(() => dispatch(setIsLoading(false)))
    }
}