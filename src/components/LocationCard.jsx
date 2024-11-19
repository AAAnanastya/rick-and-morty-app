import { useParams, useNavigate } from 'react-router-dom';
import Background from '../assets/bg-cosmos-6.jpg';
import { useState } from 'react';

export default function LocationCard() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [loadingResidents, setLoadingResidents] = useState(false);

  const storedLocations = JSON.parse(localStorage.getItem('locations')) || {};
  let currentLocation = Object.values(storedLocations).find((location) => location.id === Number(slug));

  const storedCharacters = JSON.parse(localStorage.getItem('characters')) || null;
  let charArr = currentLocation.residents.map((url) => {
    const characterId = url.split('/').pop();
    return Number(characterId);
  });

  let residentsList;

  if (storedCharacters == null) {
    setLoadingResidents(true);
    const fetchCharacters = async () => {
      try {
        const characterData = await Promise.all(
          charArr.map((id) => fetch(`https://rickandmortyapi.com/api/character/${id}`).then((res) => res.json()))
        );
        residentsList = characterData;
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoadingResidents(false);
      }
    };

    fetchCharacters();
  } else {
    const filteredCharacters = Object.values(storedCharacters).filter((character) => charArr.includes(character.id));
    residentsList = filteredCharacters;
  }

  function handleNavigateToCharCard(characterId) {
    navigate(`/characters/${characterId}`);
  }

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className="bg-cover bg-fixed bg-no-repeat h-[100%] min-h-[100vh] w-full flex justify-center items-center py-[80px] text-ivory-white font-barlow">
        {!currentLocation ? (
          <p className="text-center">Cannot find location details. Please try again later.</p>
        ) : (
          <div className="max-w-[1000px] w-full h-auto rounded-xl grid grid-cols-2 grid-rows-auto justify-items-center items-center border-2 border-double p-[50px] bg-ivory-white bg-opacity-5 backdrop-blur-[20px] m-4">
            <h1 className="font-bungee text-4xl text-center">{currentLocation.name}</h1>
            <div className="tracking-widest text-lg">
              <h2>Type: {currentLocation.type}</h2>
              <h2>Dimension: {currentLocation.dimension}</h2>
            </div>

            <div className="col-span-2 w-full h-[4px] m-[40px] bg-gradient-to-r from-transparent via-white to-transparent" />

            <h2 className="col-span-2 font-bungee text-2xl tracking-[30px]">Residents</h2>

            {loadingResidents ? (
              <p className="p-4">Loading episodes...</p>
            ) : !loadingResidents && residentsList.length > 0 ? (
              <div className="col-span-2 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 w-full mt-[30px]">
                {residentsList.map((character) => (
                  <div
                    key={character.id}
                    className="bg-ivory-white rounded-lg shadow-md overflow-hidden hover:cursor-pointer"
                    onClick={() => handleNavigateToCharCard(character.id)}>
                    <img className="object-cover w-full" src={character.image} alt={character.name} />
                    <h1 className="text-dark-green text-center font-bold font-barlow text-md">{character.name}</h1>
                  </div>
                ))}
              </div>
            ) : (
              <p className="col-span-2 text-center text-lg mt-[30px]">Residents data is not found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
