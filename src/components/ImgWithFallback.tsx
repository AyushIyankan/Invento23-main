import { m } from 'framer-motion'
import { useEffect, useState } from 'react'

import { classUtil, webpLoader } from '../utils'

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
    type = 'image/jpeg',
    ...rest
}: IFallbackProps) {
    const [imgLoading, setImgLoading] = useState(true)
    const [pulsing, setPulsing] = useState(true)
    const [webpSrc, setWebpSrc] = useState('')
    const { imgClass, imgDescription, ...delegated } = rest

    useEffect(() => {
        async function loadWebp() {
            try {
                const webp = await webpLoader(src)
                setWebpSrc(webp)
            } catch (error) {
                console.error(`Error loading webp image`, error)
            }
        }
        loadWebp()
    }, [src])

    return (
        <picture {...delegated} className={imgLoading ? 'pulsing' : ''}>
            {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
            <source srcSet={src} type={type} />
            {/* <source srcSet={src} type="image/png" /> */}

            <m.img
                src={src}
                alt={imgDescription}
                className={imgClass}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: imgLoading ? 0 : 1,
                }}
                transition={{
                    opacity: { duration: 0.4, delay: 0.5 },
                }}
                onLoad={() => {
                    setImgLoading(false)
                    setPulsing(false)
                }}
            />
        </picture>
    )
}
