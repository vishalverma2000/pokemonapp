// src/App.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import PokemonCard from "./PokemonCard";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      const results = response.data.results;

      const pokemonData = await Promise.all(
        results.map(async pokemon => {
          const pokeDetails = await axios.get(pokemon.url);
          return pokeDetails.data;
        })
      );

      setPokemons(pokemonData);
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <input
        type="text"
        className="search-input"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="pokemon-container">
        {filteredPokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
