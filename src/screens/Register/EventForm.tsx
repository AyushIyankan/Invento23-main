import { useState } from 'react'

import Natya from '../../assets/images/compressed/natya.jpg'
import { Accordion } from '../../components/Accordion'
import { ItemCard } from '../../components/Card/Card'
import { ItemGroup } from '../../components/ItemGroup'
import { useToggle } from '../../hooks'
import { useStore } from '../../store'
import { BUCKET } from './data'

export function EventForm() {
    const { addItem, removeItem, items: bucket } = useStore((state) => state)
    const [selectedKey, setSelectedKey] = useState<string[]>([])

    const items = BUCKET.map((item) => {
        return (
            <ItemCard
                selected={bucket.some((e) => e.id === item.id)}
                onClick={() => setSelectedKey((state) => [...state, item.id])}
                title={item.title}
                date={item.date}
                fee={item.fee}
                image={item.image}
                key={item.id}
                actionType="togglable"
                actions={[
                    () => addItem({ ...item, fee: item.fee.toString() }),
                    () => {
                        removeItem(item.id)
                        setSelectedKey((state) => state.filter((key) => key !== item.id))
                    },
                ]}
            />
        )
    })

    return (
        <>
            <div className="">
                <h3 className="text-black ff-serif fw-400">Select your events</h3>
            </div>
            <div className="form__eventsWrap bg-white flow grid">
                <div className="proShowWrap">
                    <ItemGroup title="Pro show">
                        <Accordion title="Day 1">
                            <div className="itemCardWrap">{items}</div>
                        </Accordion>
                        <Accordion title="Day 2">
                            <div className="itemCardWrap">{items}</div>
                        </Accordion>
                        <Accordion title="Day 3">
                            <div className="itemCardWrap">{items}</div>
                        </Accordion>
                        <Accordion title="Day 4">
                            <div className="itemCardWrap">{items}</div>
                        </Accordion>
                    </ItemGroup>
                </div>

                {/* <div className="techFestWrap">
                    <ItemGroup title="Tech Fest">
                        <Accordion title="Workshops">
                            <div className="itemCardWrap">
                                <ItemCard
                                    title="Natya"
                                    date={`${now}`}
                                    fee={200}
                                    image={`${Natya}`}
                                />
                            </div>
                        </Accordion>
                        <Accordion title="Competitions">
                            <div className="itemCardWrap">
                                <ItemCard
                                    title="Natya"
                                    date={`${now}`}
                                    fee={200}
                                    image={`${Natya}`}
                                />
                            </div>
                        </Accordion>
                        <Accordion title="Exhibitions">
                            <div className="itemCardWrap">
                                <ItemCard
                                    title="Natya"
                                    date={`${now}`}
                                    fee={200}
                                    image={`${Natya}`}
                                />
                            </div>
                        </Accordion>
                        <Accordion title="Pre-Events">
                            <div className="itemCardWrap">
                                <ItemCard
                                    title="Natya"
                                    date={`${now}`}
                                    fee={200}
                                    image={`${Natya}`}
                                />
                            </div>
                        </Accordion>
                        <Accordion title="General Events">
                            <div className="itemCardWrap">
                                <ItemCard
                                    title="Natya"
                                    date={`${now}`}
                                    fee={200}
                                    image={`${Natya}`}
                                />
                            </div>
                        </Accordion>
                    </ItemGroup>
                </div>

                <div className="form_SapthaWrap">
                    <ItemGroup title="Spotlignt Events">
                        <Accordion title="Workshops">
                            <div className="itemCardWrap">
                                <ItemCard
                                    title="Natya"
                                    date={`${now}`}
                                    fee={200}
                                    image={`${Natya}`}
                                />
                            </div>
                        </Accordion>
                        <Accordion title="Group Events">
                            <div className="itemCardWrap">
                                <ItemCard
                                    title="Natya"
                                    date={`${now}`}
                                    fee={200}
                                    image={`${Natya}`}
                                />
                            </div>
                        </Accordion>
                        <Accordion title="Solo Events">
                            <div className="itemCardWrap">
                                <ItemCard
                                    title="Natya"
                                    date={`${now}`}
                                    fee={200}
                                    image={`${Natya}`}
                                />
                            </div>
                        </Accordion>
                        <Accordion title="General Events">
                            <div className="itemCardWrap">
                                <ItemCard
                                    title="Natya"
                                    date={`${now}`}
                                    fee={200}
                                    image={`${Natya}`}
                                />
                            </div>
                        </Accordion>
                    </ItemGroup>
                </div> */}
                <button className="btn btn--save text-white ff-serif">
                    Save Changes
                </button>
            </div>
        </>
    )
}
