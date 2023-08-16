import Podium from '../../components/Podium'
import ScoreTable from '../../components/ScoreTable'
import { COLS, FakeTableData } from './data'

export function Leaderboard() {
    return (
        <div
            className="wrap-leaderboards mh-full grid grid-3-col  pt-m-4-6
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
                                image="/static/natya_large.jpg"
                            />
                            <Podium
                                name="ril"
                                points="1000"
                                position="1"
                                image="/static/natya_large.jpg"
                            />
                            <Podium
                                name="ril"
                                points="1000"
                                position="3"
                                image="/static/natya_large.jpg"
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
