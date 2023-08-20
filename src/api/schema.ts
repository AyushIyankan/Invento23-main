import { z } from 'zod'

const baseSchema = z.object({
    success: z.boolean(),
})

export const eventTypes = ['proshow', 'techfest', 'saptha', 'taksthi'] as const
export const eventCategories = [
    'workshops',
    'competitions',
    'exhibitions',
    'preevents',
    'generalevents',
    'spotlight',
    'group',
    'solo',
    'expo',
] as const

const eventSchema = z.object({
    photo: z
        .object({
            id: z.string(),
            secure_url: z.string(),
        })
        .optional(),
    photoMobile: z
        .object({
            id: z.string(),
            secure_url: z.string(),
        })
        .optional(),
    prize: z.string().default(''),
    _id: z.string(),
    name: z.string(),
    date: z.string().datetime(),
    time: z.string().datetime().default('TBA'),
    isOnline: z.boolean(),
    contactNameFirst: z.string().default(''),
    contactNumberFirst: z.string().default(''),
    contactNameSecond: z.string().default(''),
    contactNumberSecond: z.string().default(''),
    regFee: z.number().optional(),
    regFeeTeam: z.number().optional(),
    maxParticipants: z.number().optional(),
    eventType: z.enum(eventTypes),
    category: z.enum(eventCategories),
    isPreEvent: z.boolean(),
    description: z.string(),
    department: z.string().max(3),
    rules: z.array(z.string()).default([]),
    ticketBooked: z.number().optional(),
    createdAt: z.string().datetime(),
    _v: z.number(),
})

type BaseResponse = z.infer<typeof baseSchema>

export type EventType = z.infer<typeof eventSchema>

export type EventsResponse = BaseResponse & {
    events: EventType[]
}

export type EventResponse = BaseResponse & {
    event: EventType
}
