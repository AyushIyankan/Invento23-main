import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { FormInput } from '../../components/Form'
import { Fields, formSchema } from './schema'

interface FormInputs {
    name: string
    email: string
    phone: string
    referral: string
    college: string
    year: '1' | '2' | '3' | '4'
}

export function RegistrationForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormInputs>({
        mode: 'onBlur',
        resolver: zodResolver(formSchema),
    })

    const InputFields = Fields.map((field) => {
        switch (field.kind) {
            case 'input':
                return (
                    <FormInput
                        key={field.id}
                        label={field.name as keyof FormInputs}
                        forEl={field.for as keyof FormInputs}
                        register={register}
                        errors={errors}
                        required={field.required}
                        kind={field.kind}
                        inputType={field.type}
                    />
                )
            case 'select':
                return (
                    <FormInput
                        key={field.id}
                        label={field.name as keyof FormInputs}
                        forEl={field.for as keyof FormInputs}
                        register={register}
                        errors={errors}
                        required={field.required}
                        kind={field.kind}
                        options={field.options}
                    />
                )
        }
    })

    const onSubmit = (data: FormInputs) => {
        console.log(data)
    }
    console.log(isValid)
    console.log(errors)
    return (
        <div className="">
            <h2 className="text-black fw-400 ff-serif ">Personal Information</h2>
            <div className="FormWrap">
                <form onSubmit={handleSubmit(onSubmit)} className="Form">
                    {InputFields}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
