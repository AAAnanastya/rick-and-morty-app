import { useParams, useNavigate } from 'react-router-dom';
import Background from '../assets/bg-cosmos-4.jpg';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CharacterCard() {
  const { slug } = useParams();

  const [episodesVisibility, setEpisodesVisibility] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  const storedCharacters = JSON.parse(localStorage.getItem('characters')) || null;
  let character = Object.values(storedCharacters).find((character) => character.id === Number(slug));

  const storedEpisodes = JSON.parse(localStorage.getItem('episodes')) || null;
  let epArr = character.episode.map((url) => {
    const episodeId = url.split('/').pop();
    return Number(episodeId);
  });

  function handleEpListVisibility() {
    setEpisodesVisibility(!episodesVisibility);

    if (storedEpisodes) {
      const filteredEpisodes = Object.values(storedEpisodes).filter((episode) => epArr.includes(episode.id));
      setEpisodes(filteredEpisodes);
    } else {
      setLoadingEpisodes(true);
      const fetchEpisodes = async () => {
        try {
          const episodeData = await Promise.all(
            epArr.map((id) => fetch(`https://rickandmortyapi.com/api/episode/${id}`).then((res) => res.json()))
          );
          setEpisodes(episodeData);
        } catch (error) {
          console.error('Error fetching episodes:', error);
        } finally {
          setLoadingEpisodes(false);
        }
      };

      fetchEpisodes();
    }
  }

  const navigate = useNavigate();

  function handleEpClick(episodeId) {
    navigate(`/episodes/${episodeId}`);
  }

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className="bg-cover bg-fixed bg-no-repeat h-[100%] min-h-[100vh] w-full flex justify-center items-center py-[80px] text-ivory-white font-barlow">
        {!character ? (
          <p className="text-center">Cannot find character details. Please try again later.</p>
        ) : (
          <div className="max-w-[1000px] w-full h-auto rounded-xl grid grid-cols-3 grid-rows-auto justify-items-center items-center gap-x-[20px] border-2 border-double p-[50px] bg-ivory-white bg-opacity-5 backdrop-blur-[20px] m-4">
            <div className="flex items-center justify-center overflow-hidden">
              <img src={character.image} alt={character.name} className="h-auto object-cover rounded-[100%]" />
            </div>
            <div className="col-span-2 p-6 space-y-[50px]">
              <div className="flex gap-[30px] items-center">
                <h2 className="text-4xl font-bungee text-scuba-blue">{character.name}</h2>
                <span
                  className={`text-xl font-semibold ${
                    character.status === 'Alive' ? 'text-emerald-green' : character.status === 'Dead' ? 'text-red-900' : 'text-dark-grey'
                  }`}>
                  {character.status === 'unknown' ? 'status: unknown' : character.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-[30px] text-light-yellow">
                <div className="space-y-2">
                  <p>
                    <span className="font-bold">Species:</span>
                    {'\u00A0'}
                    {character.species}
                  </p>
                  <p>
                    <span className="font-bold">Gender:</span>
                    {'\u00A0'}
                    {character.gender}
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-bold">Origin:</span>
                    {'\u00A0'}
                    <a href={`/locations/${Number(character.origin.url.split('/').pop())}`} className="hover:underline">
                      {character.origin.name}
                    </a>
                  </p>
                  <p>
                    <span className="font-bold">Location:</span>
                    {'\u00A0'}
                    <a href={`/locations/${Number(character.location.url.split('/').pop())}`} className="hover:underline">
                      {character.location.name}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <button
              className="col-span-3 h-[50px] mt-[40px] m-b-[20px] w-full justify-items-center text-center py-3 px-6 bg-scuba-blue text-ivory-white rounded-lg font-semibold hover:bg-yellow-green transition-all duration-300"
              onClick={handleEpListVisibility}>
              {!episodesVisibility ? 'View List of Episodes' : 'Hide List of Episodes'}
            </button>

            {episodesVisibility && !loadingEpisodes && (
              <div className="col-span-3 mt-4 text-light-yellow max-w-[800px] w-full">
                <div className="w-full border-collapse">
                  {episodes.map((episode) => {
                    const season = parseInt(episode.episode.match(/^S(\d+)E\d+$/)?.[1], 10);
                    const episodeNumber = parseInt(episode.episode.match(/^S(\d+)E(\d+)$/)?.[2], 10);
                    return (
                      <motion.div
                        key={episode.id}
                        className="w-full border-b grid grid-cols-[repeat(2,1fr)_3fr] gap-4 py-2 hover:bg-ivory-white hover:text-scuba-blue hover:cursor-pointer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ delay: episode.id * 0.1, duration: 0.2 }}
                        onClick={() => handleEpClick(episode.id)}>
                        <div className="pl-20 w-[150px]">Season {season}</div>
                        <div>Episode {episodeNumber}</div>
                        <div>{episode.name}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
            {loadingEpisodes && <p className="p-4">Loading episodes...</p>}
          </div>
        )}
      </div>
    </div>
  );
}
