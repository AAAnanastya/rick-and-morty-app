import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import RootLayout from './components/RootLayout';
import HomePage from './pages/HomePage';
import CharactersPage from './pages/CharactersPage';
import EpisodesPage from './pages/EpisodesPage';
import LocationsPage from './pages/LocationsPage';
import CharacterCard from './components/content_pages_components/content_cards/CharacterCard';
import LocationCard from './components/content_pages_components/content_cards/LocationCard';
import EpisodeCard from './components/content_pages_components/content_cards/EpisodeCard';

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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
