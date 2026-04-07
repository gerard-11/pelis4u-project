import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { Layout } from '@/components/Layout'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import MovieDetail from '@/pages/MovieDetail'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Watchlist from '@/pages/Watchlist'
import Profile from '@/pages/Profile'

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/search', element: <Search /> },
            { path: '/movie/:id', element: <MovieDetail /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },

            {
                element: <ProtectedRoute />,
                children: [
                    { path: '/watchlist', element: <Watchlist /> },
                    { path: '/profile', element: <Profile /> },
                ],
            },
        ],
    },
])