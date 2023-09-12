import { useEffect, useState } from 'react'

import RingsSm from '../../assets/svg/ring-sm-alt.svg'
import Rings from '../../assets/svg/rings.svg'
import { ProfileCard } from '../../components/Card'
import Tabs from '../../components/Tabs/Tabs'
import { TabValue, useTabs, withTabs } from '../../context/TabsContext'
import { useMediaQuery } from '../../hooks'

const tabs: Record<string, TabValue> = {
    execom: {
        id: 'council',
        value: (
            <div className="flex">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                >
                    {/* <circle cx="7.63441" cy="7.54999" r="6.86" fill="#FFD600" /> */}
                    <circle cx="7.63441" cy="7.54999" r="6.86" fill="#fff" />
                </svg>
                Execom
            </div>
        ),
    },
    committees: {
        id: 'committees',
        value: (
            <div className="flex">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="#fff"
                >
                    <rect x="0" y="0" rx="0" ry="0" width="13" height="13" fill="#fff" />
                </svg>
                Committees
            </div>
        ),
    },

    webteam: {
        id: 'webteam',
        value: (
            <div className="flex">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                >
                    <path
                        d="M7.93565 0.689987L15.8569 14.41H0.0144043L7.93565 0.689987Z"
                        fill="white"
                    />
                </svg>
                Web Team
            </div>
        ),
    },
}

type Teams = {
    name: string
    team: string
    pub_id: string
    role: string
}

function AboutUs() {
    const { setCurrentTab } = useTabs()

    const shouldUseLarge = useMediaQuery('(min-width: 50em)')

    const [teams, setTeams] = useState<Teams[]>([])

    useEffect(() => {
        let mounted = true

        import('./teams.json').then((data) => {
            if (!mounted) return
            setTeams(data.default)
        })

        return () => {
            mounted = false
        }
    }, [])

    const getSortdTeams = (team: string) => {
        return teams.filter((t) => t.team === team)
    }
    return (
        <div className="wrap-aboutUs mh-full pt-m-4-6">
            <img src={shouldUseLarge ? Rings : RingsSm} alt="" />
            <section className="aboutUs">
                <h3 className="ff-serif fw-500 text-white">The team</h3>
                <p className="text-white ff-serif fw-400">
                    Meet our team of creators, designers, and world-class problem solvers
                </p>
                <Tabs
                    tabs={tabs}
                    defaultTab={tabs.execom}
                    onTabSelect={(tab) => setCurrentTab(tab)}
                    classNames="tabs-aboutUs"
                >
                    <Tabs.Tab id={tabs.execom.id}>
                        <div className="cards grid">
                            {getSortdTeams('Execom').map((team) => (
                                <ProfileCard
                                    key={team.name}
                                    designation={team.role}
                                    imageUrl={team.pub_id}
                                    name={team.name}
                                />
                            ))}
                        </div>
                    </Tabs.Tab>
                    <Tabs.Tab id={tabs.committees.id}>
                        <div className="cards grid">
                            {getSortdTeams('Committee').map((team) => (
                                <ProfileCard
                                    key={team.name}
                                    designation={team.role}
                                    imageUrl={team.pub_id}
                                    name={team.name}
                                />
                            ))}
                        </div>
                    </Tabs.Tab>
                    <Tabs.Tab id={tabs.webteam.id}>
                        <div className="cards grid">
                            {getSortdTeams('Web').map((team) => (
                                <ProfileCard
                                    key={team.name}
                                    designation={team.role}
                                    imageUrl={team.pub_id}
                                    name={team.name}
                                />
                            ))}
                        </div>
                    </Tabs.Tab>
                </Tabs>
            </section>
        </div>
    )
}

export default withTabs(AboutUs)
