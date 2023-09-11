import { AnimatePresence, domMax, LazyMotion, m } from 'framer-motion'
import React, { PropsWithChildren, ReactElement, useEffect, useRef } from 'react'

import { TabValue, useTabs } from '../../context/TabsContext'

type TabType = {
    [key: string]: TabValue
}

type TabsProps = {
    tabs: TabType
    defaultTab: TabValue
    onTabSelect: (tab: TabValue) => void
    classNames?: string
}
function Tabs({
    tabs,
    defaultTab,
    onTabSelect,
    children,
    classNames,
}: PropsWithChildren<TabsProps>) {
    const { currentTab, setCurrentTab } = useTabs()

    const tabListRef = useRef<HTMLUListElement>(null)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
        const tabList = tabListRef.current
        if (!tabList) return

        // array instead of NodeList
        const tabs = Array.from<HTMLElement>(tabList.querySelectorAll('[role="tab"]'))
        // console.log('tabs', tabs)
        const index = tabs.indexOf(document.activeElement as HTMLElement)

        if (index < 0) return

        switch (e.key) {
            case 'ArrowLeft': {
                const next = (index - 1 + tabs.length) % tabs.length
                tabs[next].focus()
                break
            }
            case 'ArrowRight': {
                const next = (index + 1) % tabs.length
                tabs[next].focus()
                break
            }
        }
    }

    useEffect(() => {
        setCurrentTab(defaultTab)
    }, [defaultTab, setCurrentTab])

    // Todo: Add error handling for invalid children
    //Todo: Make this accessible
    return (
        <LazyMotion features={domMax}>
            <div className={`tabs flex flex-col ${classNames ? classNames : ''}`}>
                <ul
                    className="tabs-header flex"
                    role="tablist"
                    aria-label="list of tabs"
                    ref={tabListRef}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    {Object.values(tabs).map((tabValue) => (
                        <li
                            // layout
                            // layoutId={tabValue.id}
                            key={tabValue.id}
                            className={`tabs-header-item ${
                                currentTab.id === tabValue.id ? 'active' : ''
                            }`}
                            onClick={() => {
                                setCurrentTab(tabValue)
                                onTabSelect(tabValue)
                            }}
                            role="presentation"
                        >
                            <>
                                {currentTab.id === tabValue.id && (
                                    <m.div
                                        layoutId={`active-tab-indicator`}
                                        className="active-tab-indicator"
                                        transition={{
                                            type: 'spring',
                                            bounce: 0.2,
                                            duration: 0.6,
                                        }}
                                    ></m.div>
                                )}
                                <a
                                    className="tab-header-link"
                                    href={`#${tabValue.id.toLowerCase()}`}
                                    onClick={(e) => e.preventDefault()}
                                    tabIndex={currentTab.id === tabValue.id ? 0 : -1}
                                    aria-selected={currentTab.id === tabValue.id}
                                    role="tab"
                                >
                                    {tabValue.value}
                                </a>
                            </>
                        </li>
                    ))}
                </ul>
                <div className="tabs-panels" role="tabpanel" tabIndex={0}>
                    <AnimatePresence mode="wait">
                        {children && (
                            <m.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key={currentTab.id}
                            >
                                {React.Children.map(
                                    children as ReactElement,
                                    (child: ReactElement) => {
                                        if (!child)
                                            throw new Error(
                                                'Tabs component only accepts Tab components as children',
                                            )

                                        if (
                                            child &&
                                            React.isValidElement(child) &&
                                            typeof child.type !== 'string' &&
                                            child.type?.name !== 'Tab'
                                        ) {
                                            throw new Error(
                                                'Tabs component only accepts Tab components as children',
                                            )
                                        }
                                        return child?.props.id === currentTab.id
                                            ? React.cloneElement(child, {
                                                  id: currentTab.id,
                                                  key: `${currentTab}`,
                                              })
                                            : null
                                    },
                                )}
                            </m.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </LazyMotion>
    )
}

export function Tab({ children, id }: PropsWithChildren<{ id: string }>) {
    return <section id={id}>{children}</section>
}

Tabs.Tab = Tab

export default Tabs
