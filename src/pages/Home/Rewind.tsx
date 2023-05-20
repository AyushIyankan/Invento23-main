const RewindText = () => (
    <div className="rewind-text-container">
        <div className="lg flex">
            <h3 className="ff-gothic uppercase stroked-text fw-400">
                rewinding invento 2020 ✦{' '}
            </h3>
        </div>
        <div className="sm flex">
            <h4 className="ff-gothic uppercase">Rewinding invento</h4>
            <h4 aria-hidden className="ff-gothic uppercase fw-400">
                Rewinding invento ✦
            </h4>
            <h4 aria-hidden className="ff-gothic uppercase fw-400">
                Rewinding invento ✦
            </h4>
            {/* <h4 aria-hidden className="ff-gothic uppercase fw-400">
                Rewinding invento ✦
            </h4> */}
        </div>
    </div>
)

const RewindMarquee = () => (
    <div className="marquee marquee--rewind">
        <div className="marquee__group">
            <RewindText />
        </div>
        <div aria-hidden className="marquee__group">
            <RewindText />
        </div>
    </div>
)

export function Rewind() {
    return (
        <div className="wrap-rewind mh-full">
            <RewindMarquee />
            <div className="wrap-slider"></div>
        </div>
    )
}
