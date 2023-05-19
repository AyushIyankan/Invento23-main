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
                    color="hsl(56, 100%, 78%)"
                />
                <EventCard
                    date="June 24"
                    imgSrc="/static/landing/stock-ev.jpg"
                    title="benny dayal"
                    color="hsl(313, 88%, 53%)"
                />
                <EventCard
                    date="June 24"
                    imgSrc="/static/landing/stock-ev.jpg"
                    title="the nandi sisters"
                    color="hsl(186, 71%, 46%)"
                />
            </div>
        </div>
    )
}
