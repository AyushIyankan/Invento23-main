import { ProfileCard } from '../../components/Card'
import Tabs from '../../components/Tabs/Tabs'
import { useTabs, withTabs } from '../../context/TabsContext'

const tabs = {
    council: 'Council',
    committees: 'Committees',
    webTeam: 'Web Team',
    test: (
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
            test
        </div>
    ),
}

function AboutUs() {
    const { setCurrentTab } = useTabs()

    return (
        <div className="wrap-aboutUs mh-full pt-m-4-6">
            <section className="aboutUs">
                <h3 className="ff-serif fw-500 text-white">The team</h3>
                <p className="text-white ff-serif fw-400">
                    Meet our team of creators, designers, and world-class problem solvers
                </p>
                <Tabs
                    tabs={tabs}
                    defaultTab={tabs.council}
                    onTabSelect={(tab) => setCurrentTab(tab)}
                    classNames="tabs-aboutUs"
                >
                    <Tabs.Tab id={tabs.council}>
                        <div className="cards grid">
                            <ProfileCard
                                designation="Head of ops"
                                imageUrl="/static/card_placeholder.jpg"
                                name="John Doe"
                            />{' '}
                        </div>
                    </Tabs.Tab>
                    <Tabs.Tab id={tabs.committees}>
                        <div className="cards grid">
                            <ProfileCard
                                designation='Head of Committee "X" '
                                imageUrl="/static/card_placeholder.jpg"
                                name="Jane Doe"
                            />{' '}
                        </div>
                    </Tabs.Tab>
                </Tabs>
                <div className="cards grid">
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl="/static/card_placeholder.jpg"
                        name="John Doe"
                    />

                    <ProfileCard
                        designation="Head of ops"
                        imageUrl="/static/card_placeholder.jpg"
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl="/static/card_placeholder.jpg"
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl="/static/card_placeholder.jpg"
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl="/static/card_placeholder.jpg"
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl="/static/card_placeholder.jpg"
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl="/static/card_placeholder.jpg"
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl="/static/card_placeholder.jpg"
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl="/static/card_placeholder.jpg"
                        name="John Doe"
                    />
                    <ProfileCard
                        designation="Head of ops"
                        imageUrl="/static/card_placeholder.jpg"
                        name="John Doe"
                    />
                </div>
            </section>
        </div>
    )
}

export default withTabs(AboutUs)
