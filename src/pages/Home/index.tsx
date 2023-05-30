import Crowstealers from './Crowstealers'
import { Hero } from './Hero'
import { Rewind } from './Rewind'

export default function Home() {
    return (
        <div className="main-wrapper grid flow">
            <Hero />
            <Crowstealers />
            <Rewind />
            {/* <Footer background="#000" className="footer-landing" /> */}
        </div>
    )
}
