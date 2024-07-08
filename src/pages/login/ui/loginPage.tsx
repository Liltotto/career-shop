import { AuthModal } from "entities/authModal";
import { Login } from "features/authentication";

export function LoginPage() {

  const handlerLogin = Login()

  return (
    <AuthModal
      title="Авторизация"
      prelink="Ещё не зарегистрированы?"
      link_src="/register"
      link_text="Зарегистрироваться"
      button_text="Войти"
      button_handlerClick={handlerLogin}
    />
  )
}
