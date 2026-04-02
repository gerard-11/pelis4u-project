import {createBrowserRouter} from "react-router-dom";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import MovieDetail from "@/pages/MovieDetail";
import {ProtectedRoute} from "@/router/ProtectedRoute.tsx";
import Watchlist from "@/pages/Watchlist";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import Login from "@/pages/Login";


export const router=createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/search',
        element:<Search/>
    },
    {
        path:'/movie/:id',
        element:<MovieDetail/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        element:<ProtectedRoute/>,
        children:[
            {
                path:'/watchlist',
                element:<Watchlist/>
            },
            {
                path: '/profile',
                element: <Profile />,
            },
        ]
    }
])