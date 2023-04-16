import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
])

function App() {
    return <RouterProvider router={routes} />
}

export default App
