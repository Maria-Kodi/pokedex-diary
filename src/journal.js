import './style.css'
import { handleSearch } from './modules/dialog.js'
import { searchPokemon } from './modules/search.js'
import { getCaughtPokemons } from './modules/storage.js'

/**
 * DOM elements used for search
 */
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const dialog = document.getElementById("searchDialog");
const dialogContent = document.getElementById("dialogContent");
const closeBtn = document.getElementById("closeDialog");

const caughtPokemons = [];

searchBtn.addEventListener("click", () => {
  handleSearch(searchInput, dialog, dialogContent, caughtPokemons, searchPokemon);
});

closeBtn.addEventListener("click", () => {
  dialog.style.display = "none";
});

/**
 * Loads and renders all caught Pokémon from localStorage,
 * fetches their data from PokéAPI and displays them on the page.
 */
function loadCaughtPokemons() {
  const main = document.querySelector("main");
  const caughtIds = getCaughtPokemons();

  if (caughtIds.length === 0) {
    main.innerHTML = `
      <div class="text-center text-gray-400 py-20">
        <h2 class="text-2xl font-bold mb-2">No Pokémon caught yet</h2>
        <p>Start catching Pokémon to see them here!</p>
      </div>
    `;
    return;
  }

  Promise.all(
    caughtIds.map(id =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
    )
  ).then(allDetails => {

    const container = document.getElementById("pokemonContainer");
    container.innerHTML = "";
    
    allDetails.forEach(details => {
      const pokemonData = {
        id: details.id,
        name: details.name,
        height: details.height,
        weight: details.weight,
        types: details.types.map(t => t.type.name),
        sprite: details.sprites.other?.home?.front_default || details.sprites.front_default || "",
        stats: {
          hp: details.stats[0].base_stat,
          attack: details.stats[1].base_stat,
          defense: details.stats[2].base_stat,
          speed: details.stats[5].base_stat,
        }
      };

      caughtPokemons.push(pokemonData);

      const pokemonTypesHtml = pokemonData.types
        .map(t => `<span class="type-badge type-${t}">${t}</span>`)
        .join("");

      const pokemonCard = document.createElement("div");
      pokemonCard.className = "grid md:grid-cols-2 gap-8 card p-6";

      pokemonCard.innerHTML = `
        <div class="space-y-4">
          <h1 class="text-2xl font-extrabold text-white capitalize">${pokemonData.name}</h1>
          <div class="flex items-center justify-center p-4">
            <img src="${pokemonData.sprite}" alt="${pokemonData.name}" class="w-40 h-40 object-contain">
          </div>
        </div>

        <div class="space-y-6">
          <div class="card p-4 space-y-2">
            <p><span class="text-gray-400">Height:</span> ${pokemonData.height}</p>
            <p><span class="text-gray-400">Weight:</span> ${pokemonData.weight}</p>
          </div>

          <div>
            <h3 class="mb-2 font-bold">Type</h3>
            <div class="flex gap-2">${pokemonTypesHtml}</div>
          </div>

          <div class="card p-4 text-sm space-y-2">
            <p><span class="text-gray-400">HP:</span> ${pokemonData.stats.hp}</p>
            <p><span class="text-gray-400">Attack:</span> ${pokemonData.stats.attack}</p>
            <p><span class="text-gray-400">Defense:</span> ${pokemonData.stats.defense}</p>
            <p><span class="text-gray-400">Speed:</span> ${pokemonData.stats.speed}</p>
          </div>
        </div>
      `;

      container.appendChild(pokemonCard);
    });

  }).catch(error => {
    console.error("Error loading pokemon:", error);
    main.innerHTML = `
      <p class="text-center text-red-500">
        Failed to load Pokémon. Please try again later.
      </p>
    `;
  });
}

loadCaughtPokemons();