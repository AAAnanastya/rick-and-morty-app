import { useParams, useNavigate } from 'react-router-dom';
import Background from '../../../assets/bg-cosmos-4.jpg';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';

export default function CharacterCard() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [episodesVisibility, setEpisodesVisibility] = useState(false);

  const characterQueryKey = `characterId${slug}`;
  const episodesQueryKey = `character${slug}episodes`;

  const {
    data: character,
    isLoading: loadingCharacter,
    isError: characterNotFound,
  } = useQuery(characterQueryKey, async () => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${slug}`);
    const data = await res.json();
    return data;
  });

  const {
    data: episodes,
    isLoading: loadingEpisodes,
    isError: episodesNotFound,
  } = useQuery(
    episodesQueryKey,
    async () => {
      const data = await Promise.all(character.episode.map((url) => fetch(url).then((res) => res.json())));
      return data;
    },
    { enabled: episodesVisibility }
  );

  function handleEpListVisibility() {
    setEpisodesVisibility(!episodesVisibility);
  }

  function handleEpClick(episodeId) {
    navigate(`/episodes/${episodeId}`);
  }

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className="bg-cover bg-fixed bg-no-repeat h-[100%] min-h-[100vh] w-full flex justify-center items-center py-[80px] text-ivory-white font-barlow">
        {loadingCharacter ? (
          <p className="text-center">Loading character data.</p>
        ) : characterNotFound ? (
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

            {episodesVisibility && !loadingEpisodes && !episodesNotFound && episodes?.length >= 1 && (
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
            {(episodesNotFound || episodes?.length < 1) && <p className="p-4">Cannot find episodes.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
