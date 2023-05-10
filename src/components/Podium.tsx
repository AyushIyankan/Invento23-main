import { ReactComponent as LogoPoints } from '../assets/svg/icon-points.svg'
import { ReactComponent as PodiumCube } from '../assets/svg/podium.svg'
import { ReactComponent as LogoFirst } from '../assets/svg/position_first.svg'
import { ReactComponent as LogoSecond } from '../assets/svg/position_second.svg'
import { ReactComponent as LogoThird } from '../assets/svg/position_third.svg'
import { webpLoader } from '../utils'
interface IPodium {
    name: string
    points: string
    position: '1' | '2' | '3'
    image: string
}

export default function Podium({ name, points, position, image }: IPodium) {
    return (
        <div className="podium">
            <div className="wrap-image iflex flex-col">
                <div className="bg"></div>
                <picture>
                    <source srcSet={webpLoader(image)} />
                    <source srcSet={image} />
                    <img className="podium-image" src={image} alt={name} />
                </picture>
                <h4 className="text-white fw-400 ff-serif capitalize t-center">{name}</h4>
            </div>
            <div className="inner grid">
                <PodiumCube />
                <div className="wrap-position">
                    {position === '1' && <LogoFirst className="icon-position" />}
                    {position === '2' && <LogoSecond className="icon-position" />}
                    {position === '3' && <LogoThird className="icon-position" />}
                </div>
                <div className="wrap-points">
                    <div className="flex">
                        <LogoPoints />
                        <span className="text-white ff-serif fw-400">{points}</span>
                    </div>
                    <span className="d-b text-white ff-serif fw-400">Points</span>
                </div>
            </div>
        </div>
    )
}
