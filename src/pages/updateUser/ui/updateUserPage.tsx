import { AuthModal } from "entities/authModal";
import { UpdateUser } from "features/authentication";
import { useAuth } from "features/authentication/lib/hooks/use-auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function UpdateUserPage() {

  const handlerUpdateUser = UpdateUser()

  const { isAuth } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    !isAuth && navigate('/login')
  }, [isAuth])


  return isAuth && (
    <AuthModal
      title="Изменение данных"
      prelink=""
      link_src="/login"
      link_text="Выйти"
      button_text='Сохранить'
      button_handlerClick={handlerUpdateUser as (email: string, password: string) => void}
      isUpdateUser={true}
    />
  )
}
   
