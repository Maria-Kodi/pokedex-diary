import './style.css'
import { fetchPokemons } from './modules/api.js'
import { searchPokemon } from './modules/search.js'
import { handleSearch } from './modules/dialog.js'
import { renderPokemonCard } from './modules/render.js'

/**
 * Stores processed Pokémon data fetched from API
 * @type {Array}
 */
let PokeDetailsInfo = [];

/**
 * DOM elements used for rendering and interaction
 */
const grid = document.querySelector(".dex-grid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const dialog = document.getElementById("searchDialog");
const closeBtn = document.getElementById("closeDialog");
const dialogContent = document.getElementById("dialogContent");

grid.innerHTML = `
  <p class="text-center text-gray-400">
    Loading Pokémon...
  </p>
`;

/**
 * Fetches Pokémon list and their details from PokéAPI
 */
fetchPokemons()
  .then(data => {
    return Promise.all(
      data.map(pokemon =>
        fetch(pokemon.url).then(res => res.json())
      )
    );
  })
  .then(pokemons => {
    PokeDetailsInfo = pokemons.map(details => ({
      name: details.name,
      id: details.id,
      height: details.height,
      weight: details.weight,
      abilities: details.abilities.map(a => a.ability.name),
      stats: {
        hp: details.stats[0].base_stat,
        attack: details.stats[1].base_stat,
        defense: details.stats[2].base_stat,
        specialAttack: details.stats[3].base_stat,
        specialDefense: details.stats[4].base_stat,
        speed: details.stats[5].base_stat,
      },
      types: details.types.map(t => t.type.name),
      sprite: details.sprites.other?.home?.front_default ?? details.sprites.front_default,
      notes: "",
    }));

    renderPokemons();
  })
  .catch(error => {
    grid.innerHTML = `
      <p class="text-center text-red-500">
        Failed to load Pokémon data. Please try again later.
      </p>
    `;
    console.error("API Error:", error);
  });

/**
 * Renders all Pokémon cards into the DOM grid
 */
function renderPokemons() {
  grid.innerHTML = "";

  if (PokeDetailsInfo.length === 0) {
    grid.innerHTML = `
      <p class="text-center text-gray-400">
        No Pokémon available
      </p>
    `;
    return;
  }

  PokeDetailsInfo.forEach(pokemon => {
    const card = renderPokemonCard(pokemon);
    grid.appendChild(card);
  });
}

searchBtn.addEventListener("click", () => {
  handleSearch(
    searchInput,
    dialog,
    dialogContent,
    PokeDetailsInfo,
    searchPokemon
  );
});

closeBtn.addEventListener("click", () => {
  dialog.style.display = "none";
});