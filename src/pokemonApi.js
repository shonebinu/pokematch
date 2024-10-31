const fetchPokemonData = async (offset, limit) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();
    const pokemons = data?.results;

    const detailedPokemonData = await Promise.all(
      pokemons
        .filter((_, index) => index % 3 === 0)
        .map(async (poke) => {
          const pokeResponse = await fetch(poke.url);
          const pokeData = await pokeResponse.json();
          return {
            name: poke.name,
            image: pokeData?.sprites?.front_default,
            cry: pokeData?.cries?.latest,
          };
        })
    );
    return detailedPokemonData;
  } catch (error) {
    throw new Error(`Failed to fetch Pokemon data: ${error.message}`);
  }
};

export { fetchPokemonData };
