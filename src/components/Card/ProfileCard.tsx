import { ImgWithFallback } from '../ImgWithFallback'

interface IProfileCard {
    name: string
    designation: string
    imageUrl: string
}

export function ProfileCard({ name, designation, imageUrl }: IProfileCard) {
    return (
        <div className="card__profile grid">
            <div className="image">
                <ImgWithFallback src={imageUrl} imgDescription={name} />
            </div>
            <div className="content">
                <h4 className="header text-white ff-serif fw-500">{name}</h4>
                <p className="designation ff-serif text-white fw-400">{designation}</p>
            </div>
        </div>
    )
}
