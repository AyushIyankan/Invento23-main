import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { FormInput } from '../../components/Form'
import { Fields, FormSchema, formSchema } from './schema'

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
        formState: { errors },
    } = useForm<FormInputs>({
        mode: 'onBlur',
        resolver: zodResolver(formSchema),
    })

    const InputFields = Fields.map((field) => {
        return (
            <FormInput
                key={field.id}
                label={field.name as keyof FormInputs}
                forEl={field.for as keyof FormInputs}
                register={register}
                errors={errors}
                required={field.required}
                inputType={field.type}
                options={field.options || undefined}
            />
        )
    })

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <div className="centeredContainer">
            <h2 className="text-black fw-400 ff-serif ">Personal Information</h2>
            <div className="FormWrap">
                <form onSubmit={handleSubmit(onSubmit)} className="Form">
                    {InputFields}
                </form>
            </div>
        </div>
    )
}
