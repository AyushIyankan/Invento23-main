import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { FormSchema } from '../screens/Register/schema'

type FormData = FormSchema

interface Item {
    id: string
    title: string
    date: string
    fee: string
    image: string
}

interface ItemStore {
    items: Item[]
    addItem: (item: Item) => void
    removeItem: (id: Item[`id`]) => void
}

export const useStore = create<ItemStore>()(
    devtools((set) => ({
        items: [],
        addItem: (item: Item) =>
            set((state) => ({
                ...state,
                items: [...state.items, { ...item }],
            })),
        removeItem: (id: Item[`id`]) =>
            set((state) => ({
                ...state,
                items: state.items.filter((item) => item.id !== id),
            })),
    })),
)
