import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AboutLayout, AboutUs } from './pages/AboutUs'
import Events, { Layout as EventsLayout } from './pages/events'
import { Leaderboard, LeaderboardLayout } from './pages/Leaderboard'
import Saptha, { Layout as SapthaLayout } from './pages/saptha'
import EventPreview from './screens/EventPreview'
import { NotFound } from './screens/NotFound'
import Register from './screens/Register'
import { FormLayout } from './screens/Register'

const routes = createBrowserRouter([
    {
        path: '*',
        element: <NotFound />,
    },
    {
        path: '/saptha',
        element: <SapthaLayout />,
        children: [
            {
                index: true,
                element: <Saptha />,
            },
        ],
    },

    {
        path: '/events',
        element: <EventsLayout />,
        children: [
            {
                index: true,
                element: <Events />,
            },
            {
                path: '/events/:id',
                element: <EventPreview />,
            },
        ],
    },
    {
        path: '/register',
        element: <FormLayout />,
        children: [
            {
                index: true,
                element: <Register />,
            },
        ],
    },
    {
        path: '/about',
        element: <AboutLayout />,
        children: [
            {
                index: true,
                element: <AboutUs />,
            },
        ],
    },
    {
        path: '/leaderboards',
        element: <LeaderboardLayout />,
        children: [
            {
                index: true,
                element: <Leaderboard />,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={routes} />
}

export default App
