import Crowstealers from './Crowstealers'
import { Hero } from './Hero'
import { Rewind } from './Rewind'

export default function Home() {
    return (
        <>
            <Hero />
            <div className="flow main-wrapper grid" style={{ paddingTop: '10rem' }}>
                <Crowstealers />
            </div>
            <Rewind />
        </>
    )
}
