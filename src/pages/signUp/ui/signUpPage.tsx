import { AuthModal } from "entities/authModal";
import { SignUp } from "features/authentication";

export function SignUpPage() {

  const handlerSignUp = SignUp()

  return (
    <AuthModal
      title="Регистрация"
      prelink="Уже зарегистрированы?"
      link_src="/login"
      link_text="Войти"
      button_text='Зарегистрироваться'
      button_handlerClick={handlerSignUp}
      isRegister={true}
    />
  )
}
