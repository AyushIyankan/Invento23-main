import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import Nathya from '../../assets/images/natya.png'
import Taksthi from '../../assets/images/taksthi.png'
import Card from '../../components/Card/'

export function Spotlight() {
    const myRef = useRef<null | HTMLDivElement>(null)
    const { ref, inView, entry } = useInView({
        threshold: 0.8,
    })

    // useEffect(() => {
    //     if (entry && entry?.isIntersecting) {
    //         entry.target.parentElement?.classList.toggle('effect__container')
    //     }
    // })

    return (
        <section className="saptha__spotlight bg__blur--saptha effect__wrap">
            <div className="panel--fixed">
                <h2 className="header__bg uppercase text-grey flex flex-center" ref={ref}>
                    spotlight
                </h2>
            </div>
            <div className="saptha__spotlight__cards flex flex-center panel" ref={myRef}>
                <Card bgUrl={`${Nathya}`} title="nathya" />
                <Card bgUrl={`${Taksthi}`} title="taksthi" />
            </div>
        </section>
    )
}
