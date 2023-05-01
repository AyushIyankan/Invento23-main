import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Events, { Layout as EventsLayout } from './pages/events'
import Saptha, { Layout as SapthaLayout } from './pages/saptha'
import EventPreview from './screens/EventPreview'
import Register from './screens/Register'

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
            {
                path: '/events/:id',
                element: <EventPreview />,
            },
        ],
    },
    {
        path: '/register',
        element: <Register />,
    },
])

function App() {
    return <RouterProvider router={routes} />
}

export default App
