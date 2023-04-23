import Nathya from '../../assets/images/natya.png'
import Taksthi from '../../assets/images/taksthi.png'
import Card from '../../components/Card/'

export function Spotlight() {
    return (
        <section className="saptha__spotlight bg__blur--saptha effect__wrap">
            <div className="panel--fixed">
                <h2 className="header__bg uppercase text-grey flex flex-center">
                    spotlight
                </h2>
            </div>
            <div className="saptha__spotlight__cards flex flex-center panel">
                <Card className="card grid" bgUrl={`${Nathya}`} title="nathya" />
                <Card className="card grid" bgUrl={`${Taksthi}`} title="taksthi" />
            </div>
        </section>
    )
}
