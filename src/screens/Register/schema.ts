/* eslint-disable prettier/prettier */
import { HTMLInputTypeAttribute } from 'react'
import validator from 'validator'
import z from 'zod'

const years = [
    {
        label: '1',
        value: '1',
    },
    {
        label: '2',
        value: '2',
    },
    {
        label: '3',
        value: '3',
    },
    {
        label: '4',
        value: '4',
    },
]

type FieldType = {
    id: number
    name: string
    placeholder: string
    required: boolean
    for: string
} & (
        | {
            kind: 'input'
            type: HTMLInputTypeAttribute
            autocompleteprop?: React.InputHTMLAttributes<HTMLInputElement>['autoComplete']
        }
        | {
            kind: 'select'
            options: typeof years
        }
    )

export const Fields: FieldType[] = [
    {
        id: 0,
        for: 'name',
        name: 'Name*',
        kind: 'input',
        type: 'text',
        placeholder: 'Enter you name',
        required: true,
        autocompleteprop: 'name',
    },
    {
        id: 1,
        for: 'email',
        name: 'E-mail*',
        kind: 'input',
        placeholder: 'Enter your email',
        required: true,
        type: 'email',
        autocompleteprop: 'email',
    },
    {
        id: 2,
        for: 'phone',
        name: 'Phone Number*',
        kind: 'input',
        type: 'tel',
        required: true,
        placeholder: 'Enter your phone number',
        autocompleteprop: 'tel',
    },
    {
        id: 3,
        for: 'referral',
        name: 'Referral',
        kind: 'input',
        type: 'text',
        required: false,
        placeholder: 'Enter referral if you have any',
    },
    {
        id: 4,
        for: 'college',
        name: 'College',
        kind: 'input',
        type: 'text',
        required: false,
        placeholder: 'Enter your college',
        autocompleteprop: 'organization',
    },
    {
        id: 5,
        for: 'year',
        name: 'Year*',
        kind: 'select',
        required: true,
        placeholder: 'select your year',
        options: years,
    },
]

export const formSchema = z
    .object({
        name: z.string({
            required_error: 'Name is required',
            invalid_type_error: 'Invalid Input',
        }),
        email: z
            .string({
                required_error: 'email is required',
            })
            .email('Invalid email'),
        phone: z
            .string({
                required_error: 'Phone number is required',
                invalid_type_error: 'Phone number is invalid',
            })
            .min(8, { message: 'Invalid Phone number' }),
        referral: z.string({ invalid_type_error: 'Invalid input' }).optional(),
        college: z.string({ invalid_type_error: 'Invalid input' }).optional(),
        year: z.enum(['1', '2', '3', '4'], {
            required_error: 'Year is required',
            invalid_type_error: 'Select a valid year',
        }),
    })
    .refine(
        (data) => {
            return validator.isMobilePhone(data.phone, 'en-IN')
        },
        {
            path: ['phone'],
            message: 'Invalid Phone number',
        },
    )

export type FormSchema = z.infer<typeof formSchema>
