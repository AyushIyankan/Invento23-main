import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { EventType } from '../api/schema'
import { FormSchema } from '../screens/Register/schema'

type FormData = FormSchema

type ItemSingle = {
    participationType: 'solo'
}

type Group = {
    [key: string]: string
}

type ItemTeam = {
    participationType: 'group'
    // members: Group[]
    members: string[]
}

type ItemParticipationType = {
    participationType: 'solo' | 'group'
    members?: string[]
}

type ItemImage = {
    image: string
    imageId?: string
}

export type Item = Pick<EventType, '_id' | 'name' | 'date' | 'regFee'> & {
    basePrice?: number
    updatedPrice?: number
} & ItemImage &
    ItemParticipationType
// (ItemSingle | ItemTeam)

interface ItemStore {
    items: Item[]
    addItem: (item: Item) => void
    removeItem: (id: Item[`_id`]) => void
    setMembers: (id: Item[`_id`], members: string[]) => void
    setUpdatedPrice: (id: Item[`_id`], price: number) => void
    reset: () => void
}

interface GroupStore {
    groups: { [key: string extends keyof Item ? never : Item[`_id`]]: Group[] }
    addMembers: (id: Item[`_id`], members: Group[]) => void
    reset: () => void
}

interface DetailStore {
    personalDetails: FormData
    setData: (data: FormData) => void
}

// const getLocalStorage = <T>(key: string): T =>
//     JSON.parse(window.localStorage.getItem(key) || 'null')

export const useStore = create<ItemStore>()(
    devtools(
        persist(
            (set) => ({
                items: [],
                addItem: (item: Item) =>
                    set((state) => ({
                        // ...state,
                        items: [...state.items, { ...item }],
                    })),

                removeItem: (id: Item[`_id`]) =>
                    set((state) => ({
                        ...state,
                        items: state.items.filter((item) => item._id !== id),
                    })),

                setMembers: (id: Item[`_id`], members: string[]) =>
                    set((state) => ({
                        ...state,
                        items: state.items.map((item) =>
                            item._id === id ? { ...item, members: members } : item,
                        ),
                    })),
                setUpdatedPrice: (id: Item[`_id`], price: number) =>
                    set((state) => ({
                        ...state,
                        items: state.items.map((item) =>
                            item._id === id ? { ...item, updatedPrice: price } : item,
                        ),
                    })),

                reset: () => set({ items: [] }),
            }),
            {
                name: 'itemstore',
            },
        ),
    ),
)

export const useDetailStore = create<DetailStore>()(
    devtools(
        persist(
            (set) => ({
                personalDetails: {
                    name: '',
                    email: '',
                    phone: '',
                    year: '1',
                },
                setData: (data: FormData) =>
                    set((state) => ({
                        ...state,
                        personalDetails: { ...data },
                    })),
            }),
            { name: 'formDetailStore' },
        ),
    ),
)

export const useGroupStore = create<GroupStore>()(
    devtools(
        persist(
            (set) => ({
                groups: {},
                addMembers: (id: Item[`_id`], members: Group[]) =>
                    set((state) => ({
                        ...state,
                        groups: { ...state.groups, [id]: members },
                    })),
                reset: () => set({ groups: {} }),
            }),
            { name: 'groupStore' },
        ),
    ),
)

interface PickerStore {
    pickerState: {
        filled: boolean
    }

    setPickerState: (state: boolean) => void
}

export const usePickerStore = create<PickerStore>()(
    devtools(
        persist(
            (set) => ({
                pickerState: {
                    filled: false,
                },
                setPickerState: (state) =>
                    set((prevState) => ({
                        pickerState: { ...prevState.pickerState, filled: state },
                    })),
            }),
            { name: 'pickerState' },
        ),
    ),
)
