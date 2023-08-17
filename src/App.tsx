import 'react-toastify/dist/ReactToastify.min.css'

import { Cloudinary } from '@cloudinary/url-gen'
import { domAnimation, LazyMotion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Loading from './components/Loading'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
        },
    },
})

const LazyHomeLayout = lazy(() =>
    import('./pages/Home/Layout').then((m) => {
        return { default: m.Layout }
    }),
)

export const cld = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_CLOUD_NAME,
    },
})

const LazyHome = lazy(() => import('./pages/Home'))

const LazyNotFound = lazy(() =>
    import('./screens/NotFound').then((m) => {
        return { default: m.NotFound }
    }),
)

const LazySoon = lazy(() =>
    import('./screens/Soon').then((m) => {
        return { default: m.Soon }
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

const LazyCALayout = lazy(() =>
    import('./pages/CampusAmbassadors/Layout').then((m) => {
        return { default: m.Layout }
    }),
)

const LazyCA = lazy(() => import('./pages/CampusAmbassadors'))

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
        path: '/',
        element: <LazyHomeLayout />,
        children: [
            {
                index: true,
                element: <LazyHome />,
            },
        ],
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
        element: <LazySoon />,
        // element: <LazyFormLayout />,
        // children: [
        //     {
        //         index: true,
        //         element: <LazyRegister />,
        //     },
        // ],
    },
    // {
    //     path: '/about',
    //     element: <LazyAboutLayout />,
    //     children: [
    //         {
    //             index: true,
    //             element: <LazyAbout />,
    //         },
    //     ],
    // },
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
    {
        path: '/ca',
        element: <LazyCALayout />,
        children: [
            {
                index: true,
                element: <LazyCA />,
            },
        ],
    },
])

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <QueryClientProvider client={queryClient}>
                <LazyMotion features={domAnimation} strict>
                    <RouterProvider router={routes} />
                </LazyMotion>
                <ReactQueryDevtools initialIsOpen={false} />
                <ToastContainer theme="dark" autoClose={1000} limit={1} />
            </QueryClientProvider>
        </Suspense>
    )
}

export default App
