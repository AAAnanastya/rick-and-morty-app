import Hero from '../components/home_page_components/Hero.jsx';
import HomeSectionRepresentation from '../components/home_page_components/HomeSectionRepresentation.jsx';
import CharactersHeroImg from '../assets/rick-and-morty-wallpaper.jpg';
import LocationsHeroImg from '../assets/rick-and-morty-planets.jpg';
import EpisodesHeroImg from '../assets/rick-and-morty-episodes.avif';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeSectionRepresentation title="Characters" redirect="/characters" bgColor="bg-deep-purple" image={CharactersHeroImg}>
        Dive into the weird and wonderful world of Rick and Morty characters. From the eccentric scientist Rick Sanchez to his anxious
        grandson Morty and an array of bizarre interdimensional beings, this section has a complete list of everyone you’ll encounter in the
        series. Click to explore the personalities that make Rick and Morty unforgettable.
      </HomeSectionRepresentation>
      <HomeSectionRepresentation title="Locations" redirect="/locations" bgColor="bg-dark-green" image={LocationsHeroImg}>
        Explore the vast and strange locations across the Rick and Morty multiverse. Each one holds its own unique landscapes, peculiar
        species, and unpredictable adventures. This section provides a full list of the planets featured in the show, giving you a chance to
        see where each chaotic journey unfolds.
      </HomeSectionRepresentation>
      <HomeSectionRepresentation title="Episodes" redirect="/episodes" bgColor="bg-deep-blue" image={EpisodesHeroImg}>
        Revisit every episode of Rick and Morty, from the outrageous pilot to the latest adventures. This section contains a comprehensive
        list of episodes, including summaries and memorable moments. Get ready to laugh, gasp, and relive the series from beginning to end.
      </HomeSectionRepresentation>
    </>
  );
}
