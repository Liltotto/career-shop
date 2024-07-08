import { FC, useEffect, useState } from 'react'
import './authModal.scss'
import { Link } from 'react-router-dom'
import Input from 'shared/ui/Input/Input'
import Button from 'shared/ui/Button/Button'
import { useAuth } from 'features/authentication/lib/hooks/use-auth'

interface IAuthModal {
  title: string,
  button_text: string
  prelink: string,
  link_src: string,
  link_text: string,
  button_handlerClick: (email: string, pass: string) => void,
  isRegister?: boolean,
  isUpdateUser?: boolean
}

export const AuthModal: FC<IAuthModal> = ({ title, prelink, link_src, link_text, button_text, button_handlerClick, isRegister, isUpdateUser }) => {

  const {email, password} = useAuth()

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [passwordToCheck, setPasswordToCheck] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (userPassword && passwordToCheck) setIsButtonDisabled(userPassword !== passwordToCheck);
    if(isUpdateUser) {
      setUserEmail(email)
      setUserPassword(password!)
    }
  }, [passwordToCheck])

  return (
    <div className='authModal'>
      <div className="authModal__box">
        <div className="authModal__title">{title}</div>
        <div className="authModal__content">
          <Input
            label="E-mail"
            type="email"
            value={userEmail}
            handleChange={setUserEmail}
          />
          <Input
            label='Пароль'
            type="password"
            value={userPassword}
            handleChange={setUserPassword}
          />

          {isRegister && <Input label="Повторите пароль" type="password" value={passwordToCheck} handleChange={setPasswordToCheck} />}

          <Button isDisabled={isButtonDisabled} handleClick={() => button_handlerClick(userEmail, userPassword)}>{button_text}</Button>
        </div>

      </div>

      <div className="authModal__under">
        {prelink && <span>{prelink}</span>}
        <Link to={link_src}><span className="authModal__under-link">{link_text}</span></Link>
      </div>

    </div>
  )
}
