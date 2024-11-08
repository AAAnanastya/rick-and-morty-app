import { useState, useEffect, useRef } from 'react';

import SearchBar from '../components/SearchBar';
import Background from '../assets/bg-cosmos.jpg';
import ListItem from '../components/ListItem';

export default function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pagesFetched = useRef(new Set());

  useEffect(() => {
    if (pagesFetched.current.has(page)) return;

    const fetchCharacters = async () => {
      setLoading(true);
      pagesFetched.current.add(page);

      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await res.json();

        if (data.results) {
          setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
        }
      } catch (error) {
        console.error('Error fetching characters', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 20 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div style={{ backgroundImage: `url(${Background})` }} className="bg-cover bg-fixed bg-no-repeat h-[100%] w-full">
      <div className="grid grid-cols-1 grid-rows-auto max-w-[1200px] mx-auto justify-items-center pt-[60px]">
        <SearchBar />

        <div className="w-full h-max py-[30px] px-[10px] bg-ivory-white bg-opacity-5 backdrop-blur-lg rounded-[10px] grid grid-cols-3 grid-rows-auto gap-[20px] justify-items-center">
          {characters.length > 0 ? characters.map((el) => <ListItem key={el.id} character={el} />) : <p>Loading characters...</p>}
        </div>
      </div>
    </div>
  );
}
