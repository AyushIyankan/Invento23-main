import Card from '../../components/Card/'

export function Spotlight() {
    return (
        <section className="saptha__spotlight bg__blur--saptha effect__wrap">
            <div className="panel--fixed">
                <h2 className="header__bg uppercase text-grey flex flex-center">
                    spotlight
                </h2>
            </div>
            <div className="saptha__spotlight__cards flex flex-center h-full panel">
                <Card
                    className="card--spotlight grid"
                    bgUrl="/static/natya.jpg"
                    title="natya"
                />
                <Card
                    className="card--spotlight grid"
                    bgUrl="/static/taksthi.jpg"
                    title="taksati"
                />
            </div>
        </section>
    )
}
