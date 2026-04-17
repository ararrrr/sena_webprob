import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

// HomePage Structure
import Layout from './layouts/Layout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import ArticlePage from './pages/LandingPages/ArticlePage.jsx';
import HomePage from './pages/LandingPages/HomePage.jsx';
import AboutPage from './pages/LandingPages/AboutPage.jsx';
import ArticleListPage from './pages/LandingPages/ArticleListPage.jsx';

import SignInPage from './pages/AuthPages/SignInPage.jsx';
import SignUpPage from './pages/AuthPages/SignUpPage.jsx';
import NotFoundPage from './pages/LandingPages/NotFoundPage.jsx';

const routes = [
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <Navigate to="signin" replace />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'home',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'articles',
        element: <ArticleListPage />,
      },
      {
        path: 'articles/:name',
        element: <ArticlePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
