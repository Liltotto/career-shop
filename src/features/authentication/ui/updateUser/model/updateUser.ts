import { useAuth } from "features/authentication/lib/hooks/use-auth";
import { setUser } from "features/authentication/model/userSlice";
import { getAuth, reauthenticateWithCredential, updateEmail, updatePassword } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const UpdateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {email, password} = useAuth();

    return function handleUpdateEmailAndPassword(user_email: string, user_password: string) {
        const auth = getAuth();
        const user = auth.currentUser!;
        
        // reauthenticateWithCredential

        const credential = EmailAuthProvider.credential(email!, password!)

        reauthenticateWithCredential(user, credential)
            .then(() => {
                Promise.all([
                    updateEmail(user, user_email),
                    updatePassword(user, user_password)
                ])
                    .then(() => {
                        dispatch(setUser({
                            email: user.email!,
                            id: user.uid,
                            token: user.refreshToken,
                        }))
                        console.log(user.refreshToken);
                        navigate('/login')
                        //user.reload()
                    })
                    .catch(console.error);
            })

        // Promise.all([
        //     updateEmail(user, email),
        //     updatePassword(user, password)
        // ])
        //     .then(() => {
        //         dispatch(setUser({
        //             email: user.email!,
        //             id: user.uid,
        //             token: user.refreshToken,
        //         }))
        //         console.log(user.refreshToken);
        //         navigate('/login')
        //         //user.reload()
        //     })
        //     .catch(console.error);

    }

    // handleUpdateEmail(email);
    // handleUpdatePassword(password);
}