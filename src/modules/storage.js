/**
 * Returns list of caught Pokémon IDs from localStorage
 * @returns {number[]}
 */
export function getCaughtPokemons() {
    return JSON.parse(localStorage.getItem('caughtPokemons') || '[]')
  }