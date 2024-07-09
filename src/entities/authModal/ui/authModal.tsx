import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from 'shared/ui/Input/Input'
import { Button } from 'shared/ui/Button/Button'
import { useAuth } from 'features/authentication/lib/hooks/use-auth'
import { Controller, FieldValues, SubmitHandler, useForm, useWatch } from 'react-hook-form'

import './authModal.scss'
import { disablePersistentCacheIndexAutoCreation } from 'firebase/firestore'

interface IAuthModal {
  title: string,
  button_text: string
  prelink: string,
  link_src: string,
  link_text: string,
  button_handlerClick: (email: string, pass: string) => void | SubmitHandler<FieldValues>,
  isRegister?: boolean,
  isUpdateUser?: boolean
}

export const AuthModal: FC<IAuthModal> = ({ title, prelink, link_src, link_text, button_text, button_handlerClick, isRegister, isUpdateUser }) => {

  const { email, password } = useAuth()

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [passwordToCheck, setPasswordToCheck] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    //if (userPassword && passwordToCheck) setIsButtonDisabled(userPassword !== passwordToCheck);
    if (isUpdateUser) {
      setUserEmail(email)
      setUserPassword(password!)
    }
  }, [passwordToCheck])

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    reset,
  } = useForm({
    mode: 'onChange',
  })


  const { getValues } = useForm();

  const user_email = getValues('email');
  const user_password = getValues('password');
  //console.log(getValues());

  const email_watcher = useWatch({ name: "email", control });
  const password_watcher = useWatch({ name: "password", control });
  const repeate_password_watcher = useWatch({ name: "repeate_password", control });



  //console.log(errors);
  return (
    <div className='authModal'>
      <div className="authModal__box">
        <div className="authModal__title">{title}</div>
        <div className="authModal__content">

          <div className="authModal__content-item">
            <Controller
              name="email"
              control={control}
              defaultValue={userEmail}
              render={({ field }) => (
                <Input
                  label="E-mail"
                  type="email"
                  value={field.value}
                  isError={!!errors.email}
                  handleChange={field.onChange}
                  {...register('email', {
                    required: "Поле обязательно для заполнения",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                      message: "Некорректная почта"
                    }
                  })}
                />
              )}
            />

            {errors.email && <p className='authModal__content-error'>{errors.email.message?.toString()}</p>}
          </div>


          <div className="authModal__content-item">
            <Controller
              name="password"
              control={control}
              defaultValue={userPassword}
              render={({ field }) => (
                <Input
                  label="Пароль"
                  type="password"
                  isError={!!errors.password}
                  value={field.value}
                  handleChange={field.onChange}
                  {...register('password', {
                    required: "Поле обязательно для заполнения",
                    minLength: {
                      value: 6,
                      message: "Пароль должен быть не менее 6 символов"
                    }
                  })}
                />
              )}
            />

            {errors.password && <p className='authModal__content-error'>{errors.password.message?.toString()}</p>}
          </div>



          {isRegister && (

            <div className="authModal__content-item">
              <Controller
                name="repeate_password"
                control={control}
                defaultValue={passwordToCheck}
                render={({ field }) => (
                  <Input
                    label="Повторите пароль"
                    type="password"
                    value={field.value}
                    isError={!!errors.repeate_password}
                    handleChange={field.onChange}
                    {...register('repeate_password', {
                      required: "Поле обязательно для заполнения",
                      minLength: {
                        value: 6,
                        message: "Пароль должен быть не менее 6 символов"
                      },
                      validate: (value) => value === password_watcher || "Пароли не совпадают"
                    })}
                  />
                )}
              />

              {errors.repeate_password && <p className='authModal__content-error'>{errors.repeate_password.message?.toString()}</p>}
            </div>
          )}

          <Button isDisabled={!isValid} handleClick={() => handleSubmit(button_handlerClick(email_watcher, password_watcher) as SubmitHandler<FieldValues>)}>{button_text}</Button>
        </div>

      </div>

      <div className="authModal__under">
        {prelink && <span>{prelink}</span>}
        <Link to={link_src}><span className="authModal__under-link">{link_text}</span></Link>
      </div>

    </div>
  )
}
