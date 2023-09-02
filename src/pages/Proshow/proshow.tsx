import avialPng from '../../assets/images/avial.png'
import avialWebp from '../../assets/images/avial.webp'
import avialMobilePng from '../../assets/images/avial_mob.png'
import avialMobileWebp from '../../assets/images/avial_mob.webp'
import proshowPng from '../../assets/images/proshow_banner.png'
import proshowWebp from '../../assets/images/proshow_banner.webp'
import proshowMobilePng from '../../assets/images/proshow_banner_mob.png'
import proshowMobileWebp from '../../assets/images/proshow_banner_mob.webp'
import sixEightPng from '../../assets/images/six-eight.png'
import sixEightWebp from '../../assets/images/six-eight.webp'
import sixEightMobilePng from '../../assets/images/six-eight_mob.png'
import sixEightMobileWebp from '../../assets/images/six-eight_mob.webp'

const srcs = [
    {
        png: proshowPng,
        pngMobile: proshowMobilePng,
        webp: proshowWebp,
        webpMobile: proshowMobileWebp,
        alt: 'proshow',
    },
    {
        png: sixEightPng,
        pngMobile: sixEightMobilePng,
        webp: sixEightWebp,
        webpMobile: sixEightMobileWebp,
        alt: 'six-eight',
    },
    {
        png: avialPng,
        pngMobile: avialMobilePng,
        webp: avialWebp,
        webpMobile: avialMobileWebp,
        alt: 'avial',
    },
] as const

function proshow() {
    return (
        <main className="proshow">
            {srcs.map((src) => (
                <picture key={src.alt}>
                    <source srcSet={src.webp} media="(min-width: 600px)" />
                    <source srcSet={src.png} media="(min-width: 600px)" />
                    <source srcSet={src.webpMobile} />
                    <img style={{ width: '100%' }} src={src.pngMobile} alt={src.alt} />
                </picture>
            ))}
            <div className="coming_soon">
                <p>More soon to be revealed... 🤫</p>
            </div>
        </main>
    )
}

export default proshow
