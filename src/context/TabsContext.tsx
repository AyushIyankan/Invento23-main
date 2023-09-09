import {
    ComponentType,
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from 'react'

export type TabValue = {
    id: string
    value: string | JSX.Element
}
type TabsContextType = {
    currentTab: TabValue
    setCurrentTab: Dispatch<SetStateAction<TabValue>>
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export const withTabs = <T,>(Component: ComponentType<T>) => {
    const withTabs = (props: PropsWithChildren<T>) => {
        const [currentTab, setCurrentTab] = useState<TabValue>({
            id: '',
            value: '',
        })

        return (
            <TabsContext.Provider value={{ currentTab, setCurrentTab }}>
                <Component {...props} />
            </TabsContext.Provider>
        )
    }

    const name = Component.displayName || Component.name || 'Component'
    withTabs.displayName = `withTabs(${name})`

    return withTabs
}

export const useTabs = () => {
    const context = useContext(TabsContext)

    if (!context) {
        throw new Error('useTabs must be used within a TabsProvider')
    }

    return context
}
