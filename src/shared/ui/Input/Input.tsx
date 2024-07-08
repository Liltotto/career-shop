import './input.scss'

interface IInput {
    label: string,
    type: string,
    value: string,
    // onChange: (value: string) => void
    handleChange: (value: string) => void
}

export default function Input({label, type, value, handleChange} : IInput) {

    // const [value, setValue] = useState('');

    // function handleChange(e: any) {
    //   setValue(e.target.value);
    // }
    // className="main-input__lable"
    // className="main-input__item"

    return (
        <div  className="input-container">
            <input type={type} className={value && 'filled_input'} value={value} onChange={(e) => handleChange(e.target.value)} required /> 
            <label  className={value && 'filled_label'} >{label}</label>
        </div>
      
    )
}
