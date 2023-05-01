/* eslint-disable prettier/prettier */
import { HTMLInputTypeAttribute } from 'react'
import validator from 'validator'
import z from 'zod'

const years = ['1', "2", "3", "4"] as const

type FieldType = {
    id: number
    name: string
    placeholder: string
    required: boolean
    for: string
} & (
        | {
            type: HTMLInputTypeAttribute
        }
        | {
            type: 'select'
            options: typeof years
        }
    )

export const Fields: FieldType[] = [
    {
        id: 0,
        for: 'name',
        name: 'Name*',
        type: 'text',
        placeholder: 'Enter you name',
        required: true,
    },
    {
        id: 1,
        for: 'email',
        name: 'E-mail',
        placeholder: 'Enter your email',
        required: true,
        type: 'email',
    },
    {
        id: 2,
        for: 'phone',
        name: 'Phone',
        type: 'tel',
        required: true,
        placeholder: 'Enter your phone number',
    },
    {
        id: 3,
        for: 'referall',
        name: 'Referral',
        type: 'text',
        required: false,
        placeholder: 'Enter referral if you have any',
    },
    {
        id: 4,
        for: 'college',
        name: 'College',
        type: 'text',
        required: false,
        placeholder: 'Enter your college',
    },
    {
        id: 5,
        for: 'year',
        name: 'Year',
        type: 'select',
        required: true,
        placeholder: 'select your year',
        options: years
    }
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
        phone: z.string({
            required_error: 'Phone number is required',
            invalid_type_error: 'Phone number is invalid',
        }),
        referral: z.string({ invalid_type_error: 'Invalid input' }).optional(),
        college: z.string({ invalid_type_error: 'Invalid input' }).optional(),
        year: z.enum(['1', '2', '3', '4']),
    })
    .refine(
        (data) => {
            return validator.isMobilePhone(data.phone)
        },
        {
            message: 'Invalid Phone number',
        },
    )

export type FormSchema = z.infer<typeof formSchema>
