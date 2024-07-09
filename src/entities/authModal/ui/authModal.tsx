import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Input } from 'shared/ui/Input/Input'
import { Button } from 'shared/ui/Button/Button'
import { useAuth } from 'features/authentication/lib/hooks/use-auth'
import { Controller, FieldValues, SubmitHandler, useForm, useWatch } from 'react-hook-form'

import './authModal.scss'
import WarningWindow from 'shared/ui/WarningWindow/WarningWindow'
import { setIsErrorInvalidUser, setIsErrorSameEmail } from 'features/authentication'
import { useDispatch } from 'react-redux'

interface IAuthModal {
  title: string,
  button_text: string
  prelink: string,
  link_src: string,
  link_text: string,
  button_handlerClick: (email: string, pass: string) => void | SubmitHandler<FieldValues>,
  isRegister?: boolean
}

export const AuthModal: FC<IAuthModal> = ({ title, prelink, link_src, link_text, button_text, button_handlerClick, isRegister }) => {

  const { isErrorSameEmail, isErrorInvalidUser} = useAuth()

  const dispatch = useDispatch()

  useEffect(() => {
    if (isErrorSameEmail) {
      setTimeout(() => {
        dispatch(setIsErrorSameEmail(false))
      }, 4000)
    }
  }, [isErrorSameEmail])

  useEffect(() => {
    if (isErrorInvalidUser) {
      setTimeout(() => {
        dispatch(setIsErrorInvalidUser(false))
      }, 3000)
    }
  }, [isErrorInvalidUser])

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control
  } = useForm({
    mode: 'onChange',
  })

  const email_watcher = useWatch({ name: "email", control });
  const password_watcher = useWatch({ name: "password", control });

  return (
    <div className='authModal'>
      <div className="authModal__box">
        <div className="authModal__title">{title}</div>
        <div className="authModal__content">

          <div className="authModal__content-item">
            <Controller
              name="email"
              control={control}
              defaultValue={''}
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
              defaultValue={''}
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
                defaultValue={''}
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

          {isErrorInvalidUser && <p className='authModal__content-error'>Неверная почта или пароль</p>}
        </div>

      </div>

      <div className="authModal__under">
        {prelink && <span>{prelink}</span>}
        <Link to={link_src}><span className="authModal__under-link">{link_text}</span></Link>
      </div>


      {isErrorSameEmail && <WarningWindow/>}
    </div>
  )
}
