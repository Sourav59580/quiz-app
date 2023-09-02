import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from './layouts/SidebarLayout';
import BaseLayout from './layouts/BaseLayout';

import SuspenseLoader from './components/SuspenseLoader';
import Report from './pages/Report';
import Error from './pages/Error';

// Loader
const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// pages

const Authentication = Loader(lazy(() => import('./pages/Authentication')));
const Dashboard = Loader(lazy(() => import('./pages/Dashboard')));
const Overview = Loader(lazy(() => import('./pages/Overview')));
const Quiz = Loader(lazy(() => import('./pages/Quiz')));

const routes: RouteObject[] = [
    {
        path: '',
        element: <BaseLayout />,
        children: [
            {
                path: '/',
                element: <Authentication />,
            },
            {
                path: '/overview',
                element: <Overview />,
            },
            {
                path: '404',
                element: <Error />
            },
            {
                path: '*',
                element: <Error />
            }
        ]
    },
    {
        path: '/',
        element: <SidebarLayout />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'report',
                element: <Report />,
            }
        ] 
    },
    {
       path: 'quiz',
       element: <SidebarLayout />,
       children: [
        {
            path: '',
            element: <Navigate to="1" replace />,
        },
        {
            path: ':id',
            element: <Quiz />,
        }
       ]
    }   
];

export default routes;