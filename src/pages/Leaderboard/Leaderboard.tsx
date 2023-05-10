import Placeholder from '../../assets/images/compressed/natya_large.jpg'
import Podium from '../../components/Podium'
import ScoreTable from '../../components/ScoreTable'
import { COLS, FakeTableData } from './data'

export function Leaderboard() {
    return (
        <div
            className="wrap-leaderboards mh-full grid grid-3-col
        "
        >
            <section className="leaderboards">
                <h3 className="ff-serif fw-500 text-white striked-heading">
                    Leaderboard🏆
                </h3>
                <div className="wrap-slate bg-dark-purple">
                    <div className="slate side-padding">
                        <div className="wrap-podium flow">
                            <Podium
                                name="ril"
                                points="1000"
                                position="2"
                                image={Placeholder}
                            />
                            <Podium
                                name="ril"
                                points="1000"
                                position="1"
                                image={Placeholder}
                            />
                            <Podium
                                name="ril"
                                points="1000"
                                position="3"
                                image={Placeholder}
                            />
                        </div>
                        <div className="wrap-table">
                            <ScoreTable columns={COLS} data={FakeTableData} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
