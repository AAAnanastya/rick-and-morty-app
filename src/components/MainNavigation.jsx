import { NavLink } from 'react-router-dom';

export default function MainNavigation() {
  return (
    <header className="h-[60px] py-[10px] px-[40px] flex justify-center items-center bg-dark-grey">
      <nav>
        <ul className="flex gap-[160px] text-ivory-white font-bungee tracking-widest">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/characters">Characters</NavLink>
          </li>
          <li>
            <NavLink to="/planets">Planets</NavLink>
          </li>
          <li>
            <NavLink to="/episodes">Episodes</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
