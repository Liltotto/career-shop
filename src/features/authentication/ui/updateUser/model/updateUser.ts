import { useAuth } from "features/authentication/lib/hooks/use-auth";
import { setIsErrorSameEmail, setIsLoading, setUser } from "features/authentication/model/userSlice";
import { app } from "firebase";
import { getAuth, reauthenticateWithCredential, updateEmail, updatePassword } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const UpdateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email, password, token } = useAuth();

    return async function handleUpdateEmailAndPassword(user_email: string, user_password: string) {
        dispatch(setIsLoading(true))
        const auth = getAuth(app);
        const user = auth.currentUser;

        if (user == null) return
        console.log(email);
        console.log(password);
        console.log(token);


        user.getIdToken(true).then(() => {

            const credential = EmailAuthProvider.credential(email!, password!)

            reauthenticateWithCredential(user, credential)
                .then(() => {
                    // Promise.all([
                    //     updateEmail(user, user_email),
                    //     updatePassword(user, user_password)
                    // ])
                    updateEmail(user, user_email)
                        .then(() => {
                            updatePassword(user, user_password)
                        })
                        .then(() => {
                            
                            // dispatch(setUser({
                            //     email: user.email!,
                            //     id: user.uid,
                            //     token: idToken,
                            // }))
                            navigate('/login')
                        })
                        .catch((error) => error.code === 'auth/email-already-in-use' ? dispatch(setIsErrorSameEmail(true)) : console.error(error))
                })
                .catch(console.error)
                .finally(() => dispatch(setIsLoading(false)))
        })
        .catch(console.error)

    }
}