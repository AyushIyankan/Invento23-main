import { About } from './About'
import { Hero } from './Hero'

export default function Saptha() {
    return (
        <>
            {' '}
            <div className="bg--container">
                {/* <div className="bg--box"></div> */}
                <div className="bg--full--saptha"></div>
                {/* <div className="bg--box"></div> */}
            </div>
            <Hero />
            <About />
        </>
    )
}
