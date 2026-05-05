/**
 * Handles Pokémon search by name or ID
 */
export function handleSearch(
  searchInput,
  dialog,
  dialogContent,
  pokemons,
  searchPokemon
) {
  const value = searchInput.value.trim().toLowerCase();

  if (!value) {
    dialogContent.innerHTML = `
      <p class="text-yellow-400 text-center">
        Please enter Pokémon name or ID
      </p>
    `;
    dialog.style.display = "flex";
    return;
  }

  const found = searchPokemon(pokemons, value);

  if (found) {
    dialogContent.innerHTML = `
      <div class="text-center">
        <img src="${found.sprite}" alt="${found.name}" class="mx-auto mb-3 w-32">
        <h2 class="text-2xl font-bold capitalize mb-2">${found.name}</h2>
        <p class="text-sm text-gray-400 mb-4">#${String(found.id).padStart(4, '0')}</p>

        <div class="flex justify-center gap-2 mb-4">
          ${found.types.map(t =>
            `<span class="type-badge type-${t}">${t}</span>`
          ).join("")}
        </div>

        <div class="text-sm text-gray-300 space-y-1">
          <p><span class="text-gray-400">Height:</span> ${found.height}</p>
          <p><span class="text-gray-400">Weight:</span> ${found.weight}</p>
        </div>
      </div>
    `;
  } else {
    dialogContent.innerHTML = `
      <p class="text-center text-red-400">
        No Pokémon found for "<strong>${searchInput.value.trim()}</strong>"
      </p>
    `;
  }

  dialog.style.display = "flex";
}