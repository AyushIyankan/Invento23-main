import { ReactComponent as InventoLogo } from '../assets/svg/invento-logo-red.svg'

export default function Loading() {
    return (
        <div className="wrap-loading mh-full bg-black flex">
            <InventoLogo className="loading-icon" />
        </div>
    )
}
