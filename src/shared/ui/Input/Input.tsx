
import './input.scss'


interface IInput {
    label: string,
    type: string,
    value: string,
    isError: boolean
    // onChange: (value: string) => void
    handleChange: (value: string) => void
}

export const Input = (({ label, type, value, handleChange, isError }: IInput) => {

    // const [value, setValue] = useState('');

    // function handleChange(e: any) {
    //   setValue(e.target.value);
    // }
    // className="main-input__lable"
    // className="main-input__item"
    //console.log(props);
    // const { onChange, ... } = props;
    const filled_input = value ? 'filled_input' : ''
    const error_input = isError ? 'error_input': ''
    return (
        <div className="input-container">
            <input
                //style={ isError ? {border: '1px solid red'} : {}}
                type={type}
                className={`${filled_input} ${error_input}`}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                required
            />
            <label className={value && 'filled_label'} >{label}</label>
        </div>

    )
})
