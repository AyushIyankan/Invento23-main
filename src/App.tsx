import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const LazyNotFound = lazy(() =>
    import('./screens/NotFound').then((m) => {
        return { default: m.NotFound }
    }),
)

const LazyLeaderBoardLayout = lazy(() =>
    import('./pages/Leaderboard/Layout').then((m) => {
        return { default: m.Layout }
    }),
)

const LazyLeaderBoard = lazy(() =>
    import('./pages/Leaderboard/Leaderboard').then((m) => {
        return { default: m.Leaderboard }
    }),
)

const LazyAboutLayout = lazy(() =>
    import('./pages/AboutUs/Layout').then((m) => {
        return { default: m.Layout }
    }),
)

const LazyAbout = lazy(() =>
    import('./pages/AboutUs').then((m) => {
        return { default: m.AboutUs }
    }),
)

const SapthaLazyLayout = lazy(() =>
    import('./pages/saptha/Layout').then((m) => {
        return { default: m.Layout }
    }),
)
const SapthaLazy = lazy(() => import('./pages/saptha'))

const EventsLazyLayout = lazy(() =>
    import('./pages/events/Layout').then((m) => {
        return { default: m.Layout }
    }),
)

const EventsLazy = lazy(() => import('./pages/events/Events'))
const EventsPreviewLazy = lazy(() => import('./screens/EventPreview'))

const LazyFormLayout = lazy(() =>
    import('./screens/Register/Layout').then((m) => {
        return { default: m.FormLayout }
    }),
)

const LazyRegister = lazy(() => import('./screens/Register'))

const routes = createBrowserRouter([
    {
        path: '*',
        element: <LazyNotFound />,
    },
    {
        path: '/saptha',
        element: <SapthaLazyLayout />,
        children: [
            {
                index: true,
                element: <SapthaLazy />,
            },
        ],
    },

    {
        path: '/events',
        element: <EventsLazyLayout />,
        children: [
            {
                index: true,
                element: <EventsLazy />,
            },
            {
                path: '/events/:id',
                element: <EventsPreviewLazy />,
            },
        ],
    },
    {
        path: '/register',
        element: <LazyFormLayout />,
        children: [
            {
                index: true,
                element: <LazyRegister />,
            },
        ],
    },
    {
        path: '/about',
        element: <LazyAboutLayout />,
        children: [
            {
                index: true,
                element: <LazyAbout />,
            },
        ],
    },
    {
        path: '/leaderboards',
        element: <LazyLeaderBoardLayout />,
        children: [
            {
                index: true,
                element: <LazyLeaderBoard />,
            },
        ],
    },
])

function App() {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <RouterProvider router={routes} />
        </Suspense>
    )
}

export default App
