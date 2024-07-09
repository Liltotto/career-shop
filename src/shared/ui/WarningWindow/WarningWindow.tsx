import warning_img from "shared/assets/warning.svg"
import cross from "shared/assets/cross.svg"

import './warningWindow.scss'
import { setIsErrorSameEmail } from "features/authentication"
import { useDispatch } from "react-redux"


export default function WarningWindow() {

    const dispatch = useDispatch();

    return (
        <div className="warning">
            <div className="warning__content">
                <div className="warning__content-image">
                    <img src={warning_img} alt="warning" />
                </div>

                <div className="warning__content-text">Пользователь с таким email уже зарегистрирован</div>
            </div>
            <button 
            className="warning__cross"
            onClick={() => dispatch(setIsErrorSameEmail(false))}
            >
                <img src={cross} alt="cross" />
            </button>

        </div>
    )
}
