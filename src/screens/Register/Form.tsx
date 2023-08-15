import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { FormInput } from '../../components/Form'
import { useDetailStore } from '../../store'
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
    const { personalDetails, setData } = useDetailStore((state) => state)
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid, isDirty },
    } = useForm<FormInputs>({
        mode: 'onChange',
        resolver: zodResolver(formSchema),
        reValidateMode: 'onSubmit',
        defaultValues: personalDetails,
    })

    const InputFields = Fields.map((field) => {
        switch (field.kind) {
            case 'input':
                return (
                    <FormInput
                        key={field.id}
                        label={field.name as keyof FormInputs}
                        forEl={field.for as keyof FormInputs}
                        placeholder={field.placeholder as keyof FormInputs}
                        register={register}
                        errors={errors}
                        required={field.required}
                        kind={field.kind}
                        inputType={field.type}
                        autocomplete={field.autocompleteprop}
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
                        placeholder={field.placeholder as keyof FormInputs}
                        control={control}
                    />
                )
        }
    })

    const onSubmit = (data: FormInputs) => {
        // console.log({ data, referral: data.referral })
        setData(data)
    }

    // const disableParams = !isDirty || !isValid
    const disableParams = !isValid

    // console.log({ isDirty, isValid })
    // console.log({ errors })
    return (
        <div className="">
            <h2 className="FormHeading text-black fw-400 ff-serif">
                Personal Information
            </h2>
            <div className="FormWrap bg-white">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="Form grid text-black ff-serif fw-400"
                >
                    {InputFields}
                    <button
                        type="submit"
                        className="btn btn--save text-white"
                        disabled={disableParams}
                        aria-disabled={disableParams}
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    )
}
