import { useState } from 'react'

import { useProgressiveImage } from '../../hooks'
import { webpLoader } from '../../utils'
import { ToggleButton } from '../Button'
import { ImgWithFallback } from '../ImgWithFallback'
interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
    bgUrl: string
    title: string
}

export default function Card({ bgUrl, title, ...rest }: ICardProps) {
    // const loaded = useProgressiveImage(bgUrl)
    // const loadedWebp = webpLoader(loaded ?? bgUrl)
    // const styles: React.CSSProperties = {
    //     backgroundImage: `url(${
    //          || '/static/card_placeholder.jpg'
    //     }), linear-gradient(90deg, #0C0B0B 0%, #060505 9.27%, #0E0D0D 81.79%, #0B0A0A 92.72%)`,
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: 'center center',
    //     backgroundSize: 'cover',
    //     borderRadius: '10px',
    //     display: 'grid',
    //     // gridTemplateRows: '1fr 1fr',
    //     // gap: '1rem',
    // }

    return (
        <div {...rest} className="event-card">
            <div className="event-card-img">
                <ImgWithFallback src={bgUrl} imgDescription="card-placeholder" />
            </div>
            <div className="event-card-title">
                <p className="ff-days-one fw-300 text-white uppercase">{title}</p>
            </div>
        </div>
    )
}

type ItemCardProps = {
    image: string
    title: string
    date: string
    fee: number
    selected: boolean
    onClick: () => void
} & (
    | {
          actionType: 'togglable'
          actions: [() => void, () => void]
      }
    | {
          actionType: 'nonTogglable'
          action: () => void
      }
)

export function ItemCard({ image, title, date, fee, ...props }: ItemCardProps) {
    const [loading, setLoading] = useState(false)
    //TODO: Restructure this
    return (
        <div className="itemCard ">
            <div className="itemCard_details grid">
                <div className="wrap-img flex">
                    <img src={`${image}`} alt={`${title}`} />
                </div>
                <h3 className="text-black underline ff-serif fw-400">{title}</h3>

                <p className="ff-serif text-black fw-400 detail-fee">
                    Registration Fee: {fee}
                </p>
                <p className="ff-serif text-black fw-400 detail-date"> Date: {date}</p>

                <ToggleButton
                    selected={props.selected}
                    toggle={props.onClick}
                    // actionTrue={}
                    actionTrue={
                        props.actionType === 'togglable' ? props.actions[0] : props.action
                    }
                    actionFalse={
                        props.actionType === 'togglable' ? props.actions[1] : props.action
                    }
                    isLoading={loading}
                />
            </div>
        </div>
    )
}
