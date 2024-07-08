import './button.scss'

interface IButton {
  children: string
  handleClick: (email: string, pass: string) => void,
  isDisabled?: boolean
}

export default function Button({ children, handleClick, isDisabled }: IButton) {
  return (
    <button
      className={`main-button ${isDisabled ? 'main-button_disabled' : ''}`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
