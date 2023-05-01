import { HTMLInputTypeAttribute } from 'react'
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form'

export type IFormInput<T extends FieldValues> = {
    label: Path<T>
    inputType?: HTMLInputTypeAttribute
    register: UseFormRegister<T>
    errors?: FieldErrors<T>
    required?: boolean
    forEl: Path<T>
    options?: readonly ['1', '2', '3', '4']
} & React.HTMLProps<HTMLInputElement>

export function FormInput<T extends FieldValues>({
    label,
    inputType,
    register,
    errors,
    required,
    forEl,
    options,
}: IFormInput<T>) {
    const { ref, ...rest } = register(forEl, { required })
    const { message: errorMessage } = errors?.[`${label}`] || {}

    const errorElement = (
        <span className="FormInputErrorMessage">{errorMessage as string}</span>
    )

    const selectInput = (
        <select {...rest} name={forEl} id={forEl} ref={(node) => ref(node)}>
            <option value="">Year</option>
            {options?.map((opt) => (
                <option value={opt} key={`index-${opt}`} label={opt}>
                    opt
                </option>
            ))}
        </select>
    )

    const textInput = (
        <input
            {...rest}
            name={forEl}
            type={`${inputType}`}
            id={`${forEl}`}
            ref={(node) => {
                ref(node)
            }}
        />
    )

    return (
        <div className="FormInputWrap">
            <label htmlFor={`${forEl}`}>{label}</label>
            {options ? selectInput : textInput}
            {errorMessage && errorElement}
        </div>
    )
}
