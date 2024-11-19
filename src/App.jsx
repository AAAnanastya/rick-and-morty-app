import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import RootLayout from './components/RootLayout';
import HomePage from './pages/HomePage';
import CharactersPage from './pages/CharactersPage';
import EpisodesPage from './pages/EpisodesPage';
import LocationsPage from './pages/LocationsPage';
import CharacterCard from './components/CharacterCard';
import LocationCard from './components/LocationCard';
import EpisodeCard from './components/EpisodeCard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'characters', element: <CharactersPage /> },
      { path: 'characters/:slug', element: <CharacterCard /> },
      { path: 'locations', element: <LocationsPage /> },
      { path: 'locations/:slug', element: <LocationCard /> },
      { path: 'episodes', element: <EpisodesPage /> },
      { path: 'episodes/:slug', element: <EpisodeCard /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    document.body.style.overscrollBehavior = 'none';
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
