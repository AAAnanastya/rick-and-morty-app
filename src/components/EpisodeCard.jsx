import { useParams, useNavigate } from 'react-router-dom';
import Background from '../assets/bg-cosmos-5.jpg';
import { useQuery } from 'react-query';

export default function EpisodeCard() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const episodeQueryKey = `episodeId${slug}`;
  const charactersQueryKey = `edisode${slug}characters`;

  const {
    data: episode,
    isLoading: loadingEpisode,
    isError: episodeNotFound,
  } = useQuery(episodeQueryKey, async () => {
    const res = await fetch(`https://rickandmortyapi.com/api/episode/${slug}`);
    const data = await res.json();
    return data;
  });

  const {
    data: characters,
    isLoading: loadingCharacters,
    isError: charactersNotFound,
  } = useQuery(
    charactersQueryKey,
    async () => {
      const data = await Promise.all(episode.characters.map((url) => fetch(url).then((res) => res.json())));
      return data;
    },
    { enabled: !!episode }
  );

  function handleNavigateToCharCard(characterId) {
    navigate(`/characters/${characterId}`);
  }

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className="bg-cover bg-fixed bg-no-repeat h-[100%] min-h-[100vh] w-full flex justify-center items-center py-[80px] text-ivory-white font-barlow">
        {loadingEpisode ? (
          <p className="text-center">Loading location data.</p>
        ) : episodeNotFound ? (
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
            {loadingCharacters && <p className="p-4">Loading characters...</p>}
            {!loadingCharacters && characters?.length > 0 && (
              <div className="col-span-2 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 w-full mt-[30px]">
                {characters.map((character) => (
                  <div
                    key={character.id}
                    className="bg-ivory-white rounded-lg shadow-md overflow-hidden hover:cursor-pointer"
                    onClick={() => handleNavigateToCharCard(character.id)}>
                    <img className="object-cover w-full" src={character.image} alt={character.name} />
                    <h1 className="text-dark-green text-center font-bold font-barlow text-md">{character.name}</h1>
                  </div>
                ))}
              </div>
            )}
            {charactersNotFound && <p className="col-span-2 text-center text-lg mt-[30px]">Characters data is not found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
