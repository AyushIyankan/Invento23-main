import { ErrorMessage } from '@hookform/error-message'
import { HTMLInputTypeAttribute } from 'react'
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form'

export type IFormInput<T extends FieldValues> = {
    label: Path<T>
    register: UseFormRegister<T>
    errors?: FieldErrors<T>
    required?: boolean
    forEl: Path<T>
} & (
    | {
          kind: 'input'
          inputType: HTMLInputTypeAttribute
      }
    | {
          kind: 'select'
          options: readonly ['1', '2', '3', '4']
      }
)

export function FormInput<T extends FieldValues>({
    label,
    register,
    errors,
    required,
    forEl,
    ...props
}: IFormInput<T>) {
    const { ref, ...rest } = register(forEl, { required })

    // console.log(`errors: `, errors?.[`${label}`])

    switch (props.kind) {
        case 'input':
            return (
                <div className="FormInputWrap">
                    <label htmlFor={`${forEl}`}>{label}</label>
                    <input
                        {...rest}
                        name={forEl}
                        type={props.inputType}
                        id={`${forEl}`}
                        ref={(node) => {
                            ref(node)
                        }}
                    />
                    <span className="FormInpuError">{errors?.[`${forEl}`]?.message}</span>
                </div>
            )
        case 'select':
            return (
                <div className="FormInputWrap">
                    <label htmlFor={forEl}>{label}</label>
                    <select {...rest} name={forEl} id={forEl} ref={(node) => ref(node)}>
                        <option value="">Year</option>
                        {props.options?.map((opt) => (
                            <option value={opt} key={`index-${opt}`} label={opt}>
                                opt
                            </option>
                        ))}
                    </select>
                    {/* <ErrorMessage name={forEl} errors={errors?.[`${label}`]} /> */}
                </div>
            )
    }
}
