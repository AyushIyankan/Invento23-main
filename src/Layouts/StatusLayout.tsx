import { Outlet } from 'react-router-dom'

import Nav from '../components/Navigation/Nav'

export default function Layout() {
    return (
        <div className="layout layout-status mh-full">
            <Nav background="#fff" progressLineColor="" theme="light" />
            <Outlet />
            <footer className="bg-white">
                <h2 className="text-black ff-serif fw-400">Invento&apos;23</h2>
            </footer>
        </div>
    )
}
