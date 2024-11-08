import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';

import RootLayout from './components/RootLayout';
import HomePage from './pages/HomePage';
import CharactersPage from './pages/CharactersPage';
import PlanetsPage from './pages/PlanetsPage';
import EpisodesPage from './pages/EpisodesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'characters', element: <CharactersPage /> },
      { path: 'planets', element: <PlanetsPage /> },
      { path: 'episodes', element: <EpisodesPage /> },
    ],
  },
]);

function App() {
  useEffect(() => {
    document.body.style.overscrollBehavior = 'none';
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
