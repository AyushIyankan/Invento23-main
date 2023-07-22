import { z } from 'zod'

const baseSchema = z.object({
    success: z.boolean(),
})

const eventSchema = z.object({
    photo: z.object({
        id: z.string(),
        secure_url: z.string(),
    }),
    prizeMoney: z.object({
        first: z.string(),
        second: z.string(),
        third: z.string(),
    }),
    prize: z.object({
        first: z.string(),
        second: z.string(),
        third: z.string(),
    }),
    _id: z.string(),
    name: z.string(),
    date: z.string().datetime(),
    time: z.string().datetime(),
    isOnline: z.boolean(),
    contactNameFirst: z.string(),
    contactNumberFirst: z.string(),
    contactNameSecond: z.string(),
    contactNumberSecond: z.string(),
    regFee: z.number(),
    eventType: z.string(),
    category: z.string(),
    isPreEvent: z.boolean(),
    description: z.string(),
    department: z.string().max(3),
    rules: z.array(z.string()),
    ticketBooked: z.number(),
    createdAt: z.string().datetime(),
    _v: z.number(),
})

type BaseResponse = z.infer<typeof baseSchema>

type EventType = z.infer<typeof eventSchema>

export type EventsResponse = BaseResponse & {
    events: EventType[]
}

export type EventResponse = BaseResponse & {
    event: EventType
}
