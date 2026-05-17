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
import DashLayout from './layouts/DashLayout.jsx';
import DashboardPage from './pages/DashboardPages/DashboardPage.jsx';
import ReportsPage from './pages/DashboardPages/ReportsPage.jsx';
import UsersPage from './pages/DashboardPages/UsersPage.jsx';
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage.jsx';

const AdminOnly = ({ children }) => {
  const type = localStorage.getItem('type');
  return type === 'admin' ? children : <Navigate to="/dashboard" replace />;
};

const routes = [
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
    ],
  },
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
    path: '/dashboard',
    element: <DashLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <DashboardPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'articles',
        element: <DashArticleListPage />,
      },
      {
        path: 'users',
        element: (
          <AdminOnly>
            <UsersPage />
          </AdminOnly>
        ),
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
