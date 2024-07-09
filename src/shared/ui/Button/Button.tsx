import { useAuth } from 'features/authentication/lib/hooks/use-auth';

import './button.scss'

interface IButton {
  children: string
  handleClick: () => void,
  isDisabled?: boolean
}

export const Button = ({ children, handleClick, isDisabled }: IButton) => {
  
  const {isLoading} = useAuth()

  return (
    <button
      className={`main-button ${isDisabled ? 'main-button_disabled' : ''}`}
      onClick={handleClick}
    >
      {isLoading ?  <div className="spinner"></div> : children}
    </button>
  )
}
