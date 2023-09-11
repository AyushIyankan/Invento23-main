import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react'

import { cld } from '../../App'
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
                {/* <ImgWithFallback src={imageUrl} imgDescription={name} /> */}
                <AdvancedImage
                    cldImg={cld
                        .setConfig({
                            cloud: {
                                cloudName: 'dfalkeniq',
                            },
                        })
                        .image(imageUrl)
                        .format('auto')
                        .quality('10')}
                    plugins={[
                        lazyload(),
                        placeholder({
                            mode: 'blur',
                        }),
                    ]}
                />
            </div>
            <div className="content">
                <h4 className="header text-white ff-serif fw-500">{name}</h4>
                <p className="designation ff-serif text-white fw-400">{designation}</p>
            </div>
        </div>
    )
}
