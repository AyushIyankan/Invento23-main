import { z } from 'zod'

// const baseSchema = z.object({
//     success: z.boolean(),
// })

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

const eventsResponse = z.discriminatedUnion('success', [
    z.object({
        success: z.literal(true),
        events: eventSchema.array(),
    }),
    z.object({
        success: z.literal(false),
        message: z.string(),
    }),
])

const eventResponse = z.discriminatedUnion('success', [
    z.object({
        success: z.literal(true),
        event: eventSchema,
    }),
    z.object({
        success: z.literal(false),
        message: z.string(),
    }),
])

export type EventType = z.infer<typeof eventSchema>

// export type EventsResponse = BaseResponse & {
//     events: EventType[]
// }

export type EventsResponse = z.infer<typeof eventsResponse>
export type EventResponse = z.infer<typeof eventResponse>

// export type EventResponse = BaseResponse & {
//     event: EventType
// }
