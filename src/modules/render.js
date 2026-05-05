/**
 * Creates and returns a single Pokémon card element
 * @param {Object} pokemon
 * @returns {HTMLElement}
 */
export function renderPokemonCard(pokemon) {
    const types = pokemon.types
      .map(t => `<span class="type-badge type-${t}">${t}</span>`)
      .join("");
  
    function formatName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  
    const card = document.createElement("a");
    card.href = "journal.html";
    card.className = "dex-card";
  
    card.innerHTML = `
      <div class="dex-card__img">
        <img src="${pokemon.sprite}" alt="${pokemon.name}" 
        class="w-4/5 h-auto object-contain">
      </div>
  
      <div class="dex-card__body">
        <div class="dex-card__number">
          #${String(pokemon.id).padStart(4, '0')}
        </div>
  
        <div class="flex gap-1">${types}</div>
  
        <div class="dex-card__name">
          ${formatName(pokemon.name)}
        </div>
      </div>
    `;
  
    const catchBtn = document.createElement("button");
    catchBtn.className = "catch-btn";
  
    let caughtList = JSON.parse(localStorage.getItem("caughtPokemons") || "[]");
    let isCaught = caughtList.includes(pokemon.id);
  
    catchBtn.textContent = isCaught ? "Caught" : "Catch'em";
  
    catchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
  
      let caughtList = JSON.parse(localStorage.getItem("caughtPokemons") || "[]");
      const index = caughtList.indexOf(pokemon.id);
  
      if (index > -1) {
        caughtList.splice(index, 1);
        isCaught = false;
      } else {
        caughtList.push(pokemon.id);
        isCaught = true;
      }
  
      localStorage.setItem("caughtPokemons", JSON.stringify(caughtList));
      catchBtn.textContent = isCaught ? "Caught" : "Catch'em";
    });
  
    card.appendChild(catchBtn);
    return card;
  }