export default function ListItem({ character }) {
  return (
    <div className="w-[350px] h-[150px] bg-ivory-white rounded-[5px] overflow-hidden flex">
      <div className="relative">
        <img src={character.image} alt={character.name} className="h-[150px] w-auto object-cover" />
        <div className="absolute inset-0 top-0 left-[75%] h-full w-1/4 bg-gradient-to-r from-transparent to-ivory-white"></div>
      </div>
      <div className="py-2 flex flex-col justify-between">
        <h1 className="font-bungee text-dark-grey">{character.name}</h1>
        <div>
          <div className="flex gap-4 font-barlow text-deep-blue text-md">
            <p>Status:</p>
            <p>{character.status}</p>
          </div>

          <div className="flex gap-1 font-barlow text-deep-blue text-md">
            <p>Location:</p>
            <p>{character.location.name}</p>
          </div>
        </div>

        <button className="w-max font-barlow font-bold text-dark-green tracking-wide">-- Learn More --</button>
      </div>
    </div>
  );
}
