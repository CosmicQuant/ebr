import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import { PageTracker } from './PageTracker.jsx';

const RootLayout = () => (
  <>
    <PageTracker />
    <App />
  </>
);

const router = createHashRouter([
  {
    path: "*",
    element: <RootLayout />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
