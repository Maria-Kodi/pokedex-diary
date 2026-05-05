/**
 * Searches Pokémon by name or ID
 * @param {Array} pokemons
 * @param {string} searchValue
 * @returns {Object|null}
 */
export function searchPokemon(pokemons, searchValue) {
    return pokemons.find(pokemon =>
      pokemon.name.toLowerCase() === searchValue ||
      pokemon.id.toString() === searchValue
    ) || null;
  }