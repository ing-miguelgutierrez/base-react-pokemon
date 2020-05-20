import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState("");
  const [pokemonImagenUrl, setPokemonImagenUrl] = useState("");
  const [yaLeDioClic, setYaLeDioClic] = useState(false);
  const [yaAtrapados, setYaAtrapados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const leerPokemon = await fetch("http://localhost:3000/pokemon/leer");
      const respuesta = await leerPokemon.json();
      setYaAtrapados(respuesta.pokemon);
      console.log(respuesta);
    };
    fetchData();
  }, []);

  const darClic = async () => {
    setYaLeDioClic(true);

    const obtenerPokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
    );

    // obtenerPokemon.json().then((data) => {console.log(data);})

    const data = await obtenerPokemon.json();

    const guardarEnBD = await fetch(
      `http://localhost:3000/pokemon/guardar?nombre=${pokemon}&imagen=${data.sprites.front_default}`
    );

    const respuesta = await guardarEnBD.json();

    console.log(respuesta);

    setPokemonImagenUrl(data.sprites.front_default);

    console.log(data);
  };

  const cambioInput = (e) => {
    setPokemon(e.target.value);
  };

  return (
    <div className="App">
      <div>
        <h1>Pokemon Catcher</h1>
        <input value={pokemon} onChange={(e) => cambioInput(e)} />
        <button onClick={darClic}>Catch pokemon</button>
        {yaLeDioClic && <img src={pokemonImagenUrl} alt={"pokemon image"} />}
        {yaAtrapados.map((pokemon) => {
          console.log(pokemon.imagen)
          return <img src={pokemon.imagen} alt={pokemon.nombre} />;
        })}
      </div>
    </div>
  );
}

export default App;
