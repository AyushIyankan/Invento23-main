import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    Path,
    UseFormRegister,
} from 'react-hook-form'
import Select from 'react-select'

type OptionType = {
    label: string
    value: string
}

export type IFormInput<T extends FieldValues> = {
    label: Path<T>
    register: UseFormRegister<T>
    errors?: FieldErrors<T>
    required?: boolean
    forEl: Path<T>
    placeholder: Path<T>
} & (
    | {
          kind: 'input'
          inputType: HTMLInputTypeAttribute
          autocomplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete']
      }
    | {
          kind: 'select'
          options: OptionType[]
          control: Control<T>
      }
)

export function FormInput<T extends FieldValues>({
    label,
    register,
    errors,
    required,
    forEl,
    placeholder,
    ...props
}: IFormInput<T>) {
    const { ref, ...rest } = register(forEl, { required })

    // console.log(`errors: `, errors?.[`${label}`])

    switch (props.kind) {
        case 'input':
            return (
                <div className="FormInputWrap flex flex-col">
                    <label htmlFor={`${forEl}`}>{label}</label>
                    <input
                        {...rest}
                        name={forEl}
                        type={props.inputType}
                        id={`${forEl}`}
                        required={required}
                        placeholder={placeholder}
                        ref={(node) => {
                            ref(node)
                        }}
                        autoComplete={props.autocomplete}
                    />
                    <span className="FormInputError">
                        {errors?.[`${forEl}`]?.message as string}
                    </span>
                </div>
            )
        case 'select':
            return (
                <div className="FormInputWrap flex flex-col">
                    <label htmlFor={forEl}>{label}</label>
                    <Controller
                        control={props.control}
                        name={forEl}
                        rules={{ required: required }}
                        render={({ field: { ref, name, value, onChange, ...rest } }) => {
                            const current = props.options.find((c) => c.value === value)
                            const handleSelectChange = (
                                opt: typeof props.options[0] | null,
                            ) => onChange(opt?.value)
                            return (
                                <Select
                                    {...rest}
                                    name={name}
                                    id={forEl}
                                    ref={ref}
                                    placeholder={placeholder}
                                    options={props.options}
                                    value={current}
                                    onChange={handleSelectChange}
                                />
                            )
                        }}
                    />
                    {/* <ErrorMessage name={forEl} errors={errors?.[`${label}`]} /> */}
                    <span className="FormInputError">
                        {errors?.[`${forEl}`]?.message as string}
                    </span>
                </div>
            )
    }
}
