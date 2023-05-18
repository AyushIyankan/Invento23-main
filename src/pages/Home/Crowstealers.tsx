import { EventCard } from '../../components/Card'

export default function Crowstealers() {
    return (
        <div className="wrap-crowdstealers">
            <h3 className="ff-gothic uppercase fw-400">Crowd stealers 🎤</h3>
            <div className="crowdstealers grid">
                <EventCard
                    date="June 24"
                    imgSrc="/static/landing/stock-ev.jpg"
                    title="the avial band"
                />
                <EventCard
                    date="June 24"
                    imgSrc="/static/landing/stock-ev.jpg"
                    title="benny dayal"
                />
                <EventCard
                    date="June 24"
                    imgSrc="/static/landing/stock-ev.jpg"
                    title="the nandi sisters"
                />
            </div>
        </div>
    )
}
