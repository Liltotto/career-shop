import { AuthModal } from "entities/authModal";
import { UpdateUser } from "features/authentication";
export function UpdateUserPage() {

  const handlerUpdateUser = UpdateUser()

  return (
    <AuthModal
      title="Изменение данных"
      prelink=""
      link_src="/login"
      link_text="Выйти"
      button_text='Сохранить'
      button_handlerClick={handlerUpdateUser}
    />
  )
}
