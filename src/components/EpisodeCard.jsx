import { useParams, useNavigate } from 'react-router-dom';
import Background from '../assets/bg-cosmos-5.jpg';

export default function EpisodeCard() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const storedEpisodes = JSON.parse(localStorage.getItem('episodes')) || {};
  let episode = Object.values(storedEpisodes).find((episode) => episode.id === Number(slug));

  const storedCharacters = JSON.parse(localStorage.getItem('characters')) || null;
  let charArr = episode.characters.map((url) => {
    const characterId = url.split('/').pop();
    return Number(characterId);
  });

  let attendiesList;

  if (storedCharacters == null) {
    setLoadingResidents(true);
    const fetchCharacters = async () => {
      try {
        const characterData = await Promise.all(
          charArr.map((id) => fetch(`https://rickandmortyapi.com/api/character/${id}`).then((res) => res.json()))
        );
        attendiesList = characterData;
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoadingResidents(false);
      }
    };

    fetchCharacters();
  } else {
    const filteredCharacters = Object.values(storedCharacters).filter((character) => charArr.includes(character.id));
    attendiesList = filteredCharacters;
  }

  function handleNavigateToCharCard(characterId) {
    navigate(`/characters/${characterId}`);
  }

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className="bg-cover bg-fixed bg-no-repeat h-[100%] min-h-[100vh] w-full flex justify-center items-center py-[80px] text-ivory-white font-barlow">
        {!episode ? (
          <p className="text-center">Cannot find episode details. Please try again later.</p>
        ) : (
          <div className="max-w-[1000px] w-full h-auto rounded-xl grid grid-cols-2 grid-rows-auto justify-items-center items-center border-2 border-double p-[50px] bg-ivory-white bg-opacity-5 backdrop-blur-[20px] m-4">
            <h1 className="col-span-2 font-bungee text-5xl text-center mb-[20px]">{episode.name}</h1>

            <p>
              Season: {parseInt(episode.episode.match(/^S(\d+)E\d+$/)?.[1], 10)}
              {'\u2002'}Episode: {parseInt(episode.episode.match(/^S(\d+)E(\d+)$/)?.[2], 10)}
            </p>
            <p>Air Date: {episode.air_date}</p>

            <div className="col-span-2 w-full h-[4px] m-[40px] bg-gradient-to-r from-transparent via-white to-transparent" />

            <h1 className="col-span-2 font-bungee text-2xl text-center tracking-[12px]">Characters in this episode</h1>

            <div className="col-span-2 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 w-full mt-[30px]">
              {attendiesList.map((character) => (
                <div
                  key={character.id}
                  className="bg-ivory-white rounded-lg shadow-md overflow-hidden hover:cursor-pointer"
                  onClick={() => handleNavigateToCharCard(character.id)}>
                  <img className="object-cover w-full" src={character.image} alt={character.name} />
                  <h1 className="text-dark-green text-center font-bold font-barlow text-md">{character.name}</h1>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
