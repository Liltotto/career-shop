import { FC, useEffect, useState } from 'react'
import './authModal.scss'
import { Link } from 'react-router-dom'
import Input from 'shared/ui/Input/Input'
import Button from 'shared/ui/Button/Button'

interface IAuthModal {
  title: string,
  button_text: string
  prelink: string,
  link_src: string,
  link_text: string,
  button_handlerClick: (email: string, pass: string) => void,
  isRegister?: boolean
}

export const AuthModal: FC<IAuthModal> = ({ title, prelink, link_src, link_text, button_text, button_handlerClick, isRegister }) => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [passToCheck, setPassToCheck] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (pass && passToCheck) setIsButtonDisabled(pass !== passToCheck);

  }, [passToCheck])

  return (
    <div className='authModal'>
      <div className="authModal__box">
        <div className="authModal__title">{title}</div>
        <div className="authModal__content">
          <Input
            label="E-mail"
            type="email"
            value={email}
            handleChange={setEmail}
          />
          <Input
            label='Пароль'
            type="password"
            value={pass}
            handleChange={setPass}
          />

          {isRegister && <Input label="Повторите пароль" type="password" value={passToCheck} handleChange={setPassToCheck} />}

          <Button isDisabled={isButtonDisabled} handleClick={() => button_handlerClick(email, pass)}>{button_text}</Button>
        </div>

      </div>

      <div className="authModal__under">
        {prelink && <span>{prelink}</span>}
        <Link to={link_src}><span className="authModal__under-link">{link_text}</span></Link>
      </div>

    </div>
  )
}
