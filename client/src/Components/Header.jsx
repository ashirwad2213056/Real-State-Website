import {useEffect} from "react";
import React from "react";
import { Link , useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
// import {searchLine}  from 'react-icons/ri'
import { useSelector } from "react-redux";


export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("search");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  } , [location.search])

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("search", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
    
  // console.log("currentUser:", currentUser);

  return (
    <header className="bg-slate-300">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-700">Gayatri</span>
            <span className="text-slate-900">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100  p-3 rounded-lg flex items-center">
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search..."
            className="focus:outline-none w-24 sm:w-64 "
          />
          <button onClick={handleSearch}>
            <CiSearch  className="size-7 text-slate-700" />
          </button>
        </form>
        <ul className="flex gap-6">
          <Link to="/">
            <li className="hidden sm:inline text-slate-900 hover:underline">
              Home
            </li>{" "}
          </Link>

          <Link to="/About">
            <li className="hidden sm:inline text-slate-900 hover:underline">
              About
            </li>
          </Link>

          <Link to="/profile">
            
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="w-7 h-7 rounded-full object-cover border border-gray-400"
              />
            ) : (
              <li className="text-slate-900 hover:underline">Sign in</li>
            )}

          </Link>
        </ul>
      </div>
    </header>
  );
}
