import Placeholder from '../../assets/images/card_placeholder.jpg'
import { ReactComponent as IconAdd } from '../../assets/svg/icon-add.svg'
import { useProgressiveImage } from '../../hooks'
import { webpLoader } from '../../utils'
interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
    bgUrl: string
    title: string
}

export default function Card({ bgUrl, title, ...rest }: ICardProps) {
    const loaded = useProgressiveImage(bgUrl)
    const loadedWebp = useProgressiveImage(webpLoader(bgUrl))
    const styles: React.CSSProperties = {
        backgroundImage: `url(${
            (loadedWebp ?? loaded) || Placeholder
        }), linear-gradient(90deg, #0C0B0B 0%, #060505 9.27%, #0E0D0D 81.79%, #0B0A0A 92.72%)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        borderRadius: '10px',
        display: 'grid',
    }

    const titleStyle: React.CSSProperties = {
        fontSize: 'clamp(1.8rem, 1.54rem + 1.3vw, 3.1rem)',
        justifySelf: 'end',
        alignSelf: 'self-end',
    }

    return (
        <div {...rest} style={styles}>
            <p className="ff-days-one fw-400 text-white uppercase" style={titleStyle}>
                {title}
            </p>
        </div>
    )
}

interface ItemCardProps {
    image: string
    title: string
    date: string
    fee: number
}

export function ItemCard({ image, title, date, fee }: ItemCardProps) {
    //TODO: Restructure this
    return (
        <div className="itemCard bg-greyish-white">
            <div className="itemCard_details flex">
                <div className="wrap-img">
                    <img src={`${image}`} alt={`${title}`} />
                </div>
                <h3 className="text-black underline ff-serif fw-400">{title}</h3>
                <button className="btn btn--add flex">
                    <span className="text-grey ff-serif">Add event</span>
                    <IconAdd aria-hidden />
                </button>
            </div>
            <div className="itemCard_More flex">
                <span className="ff-serif text-black fw-400">
                    Registration Fee: {fee}
                </span>
                <span className="ff-serif text-black fw-400"> Date: {date}</span>
            </div>
        </div>
    )
}
