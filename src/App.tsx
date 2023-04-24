import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Events, { Layout as EventsLayout } from './pages/events'
import Saptha, { Layout as SapthaLayout } from './pages/saptha'

const routes = createBrowserRouter([
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
        ],
    },
])

function App() {
    return <RouterProvider router={routes} />
}

export default App
