import { useRef } from 'react'

import { ReactComponent as IconShare } from '../../assets/svg/icon-share.svg'
import { ReactComponent as IconTrophy } from '../../assets/svg/trophy.svg'
import Button from '../../components/Button'

export default function CampusAmbassadors() {
    async function handleShare(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (navigator.share) {
            try {
                await navigator.share({
                    url: window.location.href,
                    title: 'Invento-23',
                    text: 'Join invento',
                })
            } catch (error) {
                console.error(error)
            }
        }
        console.log('Web share api is unsupported')
        try {
            await navigator.clipboard.writeText(window.location.origin)
            const btn = e.target as HTMLButtonElement

            if (btn) {
                btn.setAttribute(
                    'data-tooltip',
                    'Successfully copied the link to your clipboard',
                )
                btn.focus()
                setTimeout(() => {
                    btn.blur()
                }, 3000)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="wrap-CA mh-full pt-m-4-6">
            <section className="section-ca">
                <h1 className="ff-serif fw-500 text-white striked-heading ca-heading">
                    Campus ambassador
                </h1>
                <p className="text-white ff-serif fw-400">
                    Be one of our campus ambassadors and get exciting prizes and offers!!
                </p>

                <div className="ca-btn-wrap flex">
                    <Button
                        type="internalUrl"
                        to="/register"
                        classNames="btn btn--link btn-ca btn-ca-reg ff-serif"
                    >
                        Register
                    </Button>

                    <Button
                        type="internalUrl"
                        to="/home"
                        classNames="ff-serif text-white btn btn--link btn-ca btn-ca-explore"
                    >
                        explore
                    </Button>
                </div>

                <div className="info flex">
                    <div className="ff-serif fw-400 text-white">
                        <p>30+</p>
                        <span className="t-center">Competitions</span>
                    </div>
                    <div className="ff-serif fw-400 text-white">
                        <p>30+</p>
                        <span className="t-center">expo</span>
                    </div>
                    <div className="ff-serif fw-400 text-white">
                        <p>30+</p>
                        <span className="t-center">workshop</span>
                    </div>
                </div>

                <div className="wrap-share flow">
                    <h2 className="text-white fw-500 ff-serif ca-heading-sec">
                        What you can do
                    </h2>

                    <div className="card-share">
                        <Button
                            type="button"
                            onClick={handleShare}
                            className="btn btn--share tooltip"
                            data-tooltip="click to share"
                        >
                            <IconShare />
                        </Button>
                        <p className="text-white ff-serif fw-400">
                            Share all posters and links on your social media and groups
                        </p>
                    </div>

                    <div className="card-share">
                        <Button
                            type="button"
                            onClick={handleShare}
                            className="btn btn--share tooltip"
                            data-tooltip="Click to share"
                        >
                            <IconShare />
                        </Button>
                        <p className="text-white ff-serif fw-400">
                            Share all posters and links on your social media and groups
                        </p>
                    </div>

                    <div className="wrap-prize grid text-white fw-400 ff-serif">
                        <h2 className="ca-heading-sec fw-400">Prize Pool</h2>
                        <div className="wrapper">
                            <div className="prize-main flex">
                                <span>
                                    <IconTrophy />
                                </span>
                                <div>
                                    <p>Prizes worth: </p>
                                    <p>100K</p>
                                </div>
                            </div>
                            <div className="prize-detail grid">
                                <p>🥇 20,000</p>
                                <div className="flex">
                                    <p>🥈 20,000</p>
                                    <p>🥉 20,000</p>
                                </div>
                            </div>
                        </div>

                        <div className="prize-more grid">
                            <div className="flex">
                                <div>
                                    <p>4th to 10th</p>
                                    <p>100K</p>
                                </div>
                                <div>
                                    <p>11th to 20th</p>
                                    <p>100K</p>
                                </div>
                            </div>

                            <div>
                                <p>20th to 25th</p>
                                <p>Certificates</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrap-card-share flex">
                    <div className="ca-card-reg text-white ff-serif grid">
                        <p>🔥</p>
                        <div className="ca-card-reg-inner-text">
                            <h4 className="fw-400">Are you excited</h4>
                            <p>to be a part of Invento 23 ?</p>
                        </div>
                        <Button
                            type="internalUrl"
                            to="/register"
                            classNames="btn btn--link"
                        >
                            register
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
