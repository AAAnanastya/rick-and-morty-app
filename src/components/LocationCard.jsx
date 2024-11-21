import { useParams, useNavigate } from 'react-router-dom';
import Background from '../assets/bg-cosmos-6.jpg';
import { useQuery } from 'react-query';

export default function LocationCard() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const locationQueryKey = `locationId${slug}`;
  const residentsQueryKey = `location${slug}residents`;

  const {
    data: location,
    isLoading: loadingLocation,
    isError: locationNotFound,
  } = useQuery(locationQueryKey, async () => {
    const res = await fetch(`https://rickandmortyapi.com/api/location/${slug}`);
    const data = await res.json();
    return data;
  });

  const {
    data: residents,
    isLoading: loadingResidents,
    isError: residentsNotFound,
  } = useQuery(
    residentsQueryKey,
    async () => {
      const data = await Promise.all(location.residents.map((url) => fetch(url).then((res) => res.json())));
      return data;
    },
    { enabled: !!location }
  );

  function handleNavigateToCharCard(characterId) {
    navigate(`/characters/${characterId}`);
  }

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className="bg-cover bg-fixed bg-no-repeat h-[100%] min-h-[100vh] w-full flex justify-center items-center py-[80px] text-ivory-white font-barlow">
        {loadingLocation ? (
          <p className="text-center">Loading location data.</p>
        ) : locationNotFound ? (
          <p className="text-center">Cannot find location details. Please try again later.</p>
        ) : (
          <div className="max-w-[1000px] w-full h-auto rounded-xl grid grid-cols-2 grid-rows-auto justify-items-center items-center border-2 border-double p-[50px] bg-ivory-white bg-opacity-5 backdrop-blur-[20px] m-4">
            <h1 className="font-bungee text-4xl text-center">{location.name}</h1>
            <div className="tracking-widest text-lg">
              <h2>Type: {location.type}</h2>
              <h2>Dimension: {location.dimension}</h2>
            </div>
            <div className="col-span-2 w-full h-[4px] m-[40px] bg-gradient-to-r from-transparent via-white to-transparent" />
            <h2 className="col-span-2 font-bungee text-2xl tracking-[30px]">Residents</h2>
            {loadingResidents && <p className="p-4">Loading residents...</p>}{' '}
            {!loadingResidents && residents?.length > 0 && (
              <div className="col-span-2 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 w-full mt-[30px]">
                {residents.map((character) => (
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
            {residentsNotFound && <p className="col-span-2 text-center text-lg mt-[30px]">Residents data is not found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
