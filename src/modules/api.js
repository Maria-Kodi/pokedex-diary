/**
* Fetches the first 28 Pokémon from PokéAPI 
*/
export async function fetchPokemons() {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=28'
    )
    const data = await response.json()
  
    return data.results
  }