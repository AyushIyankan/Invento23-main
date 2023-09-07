import {
    ComponentType,
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from 'react'

type TabsContextType = {
    currentTab: string | JSX.Element
    setCurrentTab: Dispatch<SetStateAction<string | JSX.Element>>
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export const withTabs = <T,>(Component: ComponentType<T>) => {
    const withTabs = (props: PropsWithChildren<T>) => {
        const [currentTab, setCurrentTab] = useState<string | JSX.Element>('')

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
