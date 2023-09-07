import React, { PropsWithChildren, ReactElement, useEffect, useRef } from 'react'

import { useTabs } from '../../context/TabsContext'

type TabType = Record<string, string | JSX.Element>

type TabsProps = {
    tabs: TabType
    defaultTab: string
    onTabSelect: (tab: string | JSX.Element) => void
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
                        key={tabValue.toString()}
                        className={`tabs-header-item ${
                            currentTab === tabValue ? 'active' : ''
                        }`}
                        onClick={() => {
                            setCurrentTab(tabValue)
                            onTabSelect(tabValue)
                        }}
                        role="presentation"
                    >
                        {/* {tabValue} */}
                        <a
                            className="tab-header-link"
                            href={`#${tabValue.toString().toLowerCase()}`}
                            onClick={(e) => e.preventDefault()}
                            tabIndex={currentTab === tabValue ? 0 : -1}
                            aria-selected={currentTab === tabValue}
                            role="tab"
                        >
                            {tabValue}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="tabs-panels" role="tabpanel" tabIndex={0}>
                {children &&
                    React.Children.map(
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
                            return child?.props.id === currentTab
                                ? React.cloneElement(child, {
                                      id: currentTab.toString().toLowerCase(),
                                      key: `${currentTab}`,
                                  })
                                : null
                        },
                    )}
            </div>
        </div>
    )
}

export function Tab({ children, id }: PropsWithChildren<{ id: string }>) {
    return <section id={id}>{children}</section>
}

Tabs.Tab = Tab

export default Tabs
