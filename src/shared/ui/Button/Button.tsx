import { useDispatch } from 'react-redux';
import './button.scss'
import { setIsLoading } from 'features/authentication';
import { useAuth } from 'features/authentication/lib/hooks/use-auth';

interface IButton {
  children: string
  handleClick: () => void,
  isDisabled?: boolean
}

export default function Button({ children, handleClick, isDisabled }: IButton) {
  // const dispatch = useDispatch();
  
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
