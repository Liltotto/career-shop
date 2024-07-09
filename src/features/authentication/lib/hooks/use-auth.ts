
import { useAppSelector } from 'shared/lib/store/index';

export function useAuth() {
    const {email, token, id, password, isLoading, isErrorSameEmail, isErrorInvalidUser} = useAppSelector((state) => state.user);

    return {
        isAuth: !!email,
        email,
        token,
        id,
        password,
        isLoading,
        isErrorSameEmail,
        isErrorInvalidUser
    };
}