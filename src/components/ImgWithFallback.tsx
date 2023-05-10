import { webpLoader } from '../utils'

type IFallbackProps = {
    src: string
    // fallback: string
    type?: string
    imgClass?: string
    imgDescription: string
} & React.HTMLProps<HTMLPictureElement>

export function ImgWithFallback({
    src,
    // fallback,
    type = 'image/webp',
    ...rest
}: IFallbackProps) {
    const { imgClass, imgDescription, ...delegated } = rest
    return (
        <picture {...delegated}>
            <source srcSet={webpLoader(src)} type={type} />
            <img src={src} alt={imgDescription} className={imgClass} />
        </picture>
    )
}
