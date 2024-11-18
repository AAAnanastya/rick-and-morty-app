import { useParams, useNavigate } from 'react-router-dom';
import Background from '../assets/bg-cosmos-4.jpg';
import { useState } from 'react';

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
          <p>Cannot find character details. Please try again later.</p>
        ) : (
          <div className="max-w-[1000px] w-full h-auto rounded-xl grid grid-cols-3 grid-rows-auto justify-items-center items-center gap-x-[20px] border-2 border-double p-[50px] bg-ivory-white bg-opacity-5 backdrop-blur-[20px] m-4">
            <div className="flex items-center justify-center overflow-hidden">
              <img src={character.image} alt={character.name} className="h-auto object-cover rounded-[100%]" />
            </div>
            <div className="col-span-2 p-6 space-y-[50px]">
              <div className="flex gap-[30px] items-center">
                <h2 className="text-4xl font-bungee text-scuba-blue">{character.name}</h2>
                <span className="text-xl font-semibold text-emerald-green">{character.status}</span>
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
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {episodes.map((episode) => {
                      const season = parseInt(episode.episode.match(/^S(\d+)E\d+$/)?.[1], 10);
                      const episodeNumber = parseInt(episode.episode.match(/^S(\d+)E(\d+)$/)?.[2], 10);
                      return (
                        <tr key={episode.id} className="hover:bg-gray-100 hover:text-scuba-blue" onClick={() => handleEpClick(episode.id)}>
                          <td className="pl-20 mr-6 py-2 border-b w-[150px]">Season {season}</td>
                          <td className="py-2 border-b">Episode {episodeNumber}</td>
                          <td className="pl-20 py-2 border-b">
                            <a href={`/episodes/${episode.id}`}>{episode.name}</a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {loadingEpisodes && <p>Loading episodes...</p>}
          </div>
        )}
      </div>
    </div>
  );
}
