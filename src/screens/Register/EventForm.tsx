import Natya from '../../assets/images/compressed/natya.jpg'
import { Accordion } from '../../components/Accordion'
import { ItemCard } from '../../components/Card/Card'
import { ItemGroup } from '../../components/ItemGroup'

const now = new Date().toLocaleDateString('en-US')

export function EventForm() {
    return (
        <>
            <h3 className="text-black-ff-serif-fw-400">Select your events</h3>
            <div className="form__eventsWrap centeredContainer bg-white">
                <div className="proShowWrap">
                    <ItemGroup title="Pro show">
                        <Accordion title="Day 1">
                            <ItemCard
                                title="Natya"
                                date={`${now}`}
                                fee={200}
                                image={`${Natya}`}
                            />
                        </Accordion>
                        <Accordion title="Day 2">
                            <ItemCard
                                title="Natya"
                                date={`${now}`}
                                fee={200}
                                image={`${Natya}`}
                            />
                        </Accordion>
                        <Accordion title="Day 3">
                            <ItemCard
                                title="Natya"
                                date={`${now}`}
                                fee={200}
                                image={`${Natya}`}
                            />
                        </Accordion>
                        <Accordion title="Day 4">
                            <ItemCard
                                title="Natya"
                                date={`${now}`}
                                fee={200}
                                image={`${Natya}`}
                            />
                        </Accordion>
                    </ItemGroup>
                </div>
            </div>
        </>
    )
}
