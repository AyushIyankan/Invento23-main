import { isSmall } from '../hooks'
import { ImgWithFallback } from './ImgWithFallback'
export interface SliderItemProps {
    id: string
    src: string
    title: string
}

interface SliderProps {
    images: SliderItemProps[]
    direction?: 'ltr' | 'rtl'
}

export default function Slider({ images, direction = 'ltr' }: SliderProps) {
    const isMobile = isSmall()
    const items = images.map((image) => (
        <div className="slider__item" key={image.id}>
            <ImgWithFallback
                src={image.src}
                imgDescription={image.title}
                className="wrap-slider-img"
                imgClass={!isMobile ? 'img-greyscale' : ''}
            />
        </div>
    ))

    return (
        <div className="slider grid marquee">
            <div className="marquee__group">{items}</div>

            <div aria-hidden className="marquee__group">
                {items}
            </div>
        </div>
    )
}
