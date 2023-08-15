import { create, StoreApi } from 'zustand'
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
    members: Group[]
}

type ItemImage = {
    image: string
}

type Item = Pick<EventType, '_id' | 'name' | 'date' | 'regFee'> &
    ItemImage &
    (ItemSingle | ItemTeam)

interface ItemStore {
    items: Item[]
    addItem: (item: Item) => void
    removeItem: (id: Item[`_id`]) => void
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

const getLocalStorage = <T>(key: string): T =>
    JSON.parse(window.localStorage.getItem(key) || 'null')

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
