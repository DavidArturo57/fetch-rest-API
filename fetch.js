const API_URL = "https://pokeapi.co/api/v2/";

// Función para hacer la solicitud a la API de Pokémon
const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${API_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}

// Función para generar la tarjeta del Pokémon
const displayPokemonCard = (pokemon) => {
    const cardContainer = document.getElementById('card-pokemon');

    // Limpiar cualquier contenido previo de la tarjeta
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
    
    // Crear elementos para la tarjeta
    const card = document.createElement('div');
    card.classList.add('card-pokemon');
    
    // Imagen del Pokémon
    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;  // Usamos la imagen por defecto
    img.alt = pokemon.name;
    
    // Nombre del Pokémon
    const name = document.createElement('h2');
    name.textContent = `Name: ${pokemon.name}`;
    
    // ID del Pokémon
    const id = document.createElement('p');
    id.textContent = `ID: ${pokemon.id}`;
    
    // Peso del Pokémon
    const weight = document.createElement('p');
    weight.textContent = `Weight: ${pokemon.weight}`;

    // Agregar los nuevos elementos a la tarjeta
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(id);
    card.appendChild(weight);
    
    // Agregar la tarjeta al contenedor del DOM
    cardContainer.appendChild(card);
}

// Cargar Pokémon desde localStorage si existe
const loadPokemonFromStorage = async () => {
    const pokemonId = localStorage.getItem('pokemonId');
    if (pokemonId) {
        const pokemon = await fetchPokemon(pokemonId);
        displayPokemonCard(pokemon);
    }
}

// Manejo del botón 'Get'
document.getElementById('get-btn').addEventListener('click', async () => {
    const text = document.getElementById("poke-name").value.toLowerCase();
    const pokemon = await fetchPokemon(text);
    
    // Almacenar el ID del Pokémon en localStorage
    localStorage.setItem("pokemonId", pokemon.id);
    
    // Mostrar la tarjeta del Pokémon
    displayPokemonCard(pokemon);
});

// Manejo del botón 'Prev' (botón para ver el Pokémon anterior)
document.getElementById('prev-btn').addEventListener('click', async () => {
    let currentPokemonId = localStorage.getItem("pokemonId");
    if (!currentPokemonId) return; // Si no hay un ID válido en localStorage, no hacer nada
    
    const newId = Math.max(1, currentPokemonId - 1);
    const pokemon = await fetchPokemon(newId);
    
    // Almacenar el nuevo ID en localStorage
    localStorage.setItem("pokemonId", pokemon.id);
    
    // Mostrar la tarjeta del nuevo Pokémon
    displayPokemonCard(pokemon);
});

// Manejo del botón 'Next' (botón para ver el siguiente Pokémon)
document.getElementById('next-btn').addEventListener('click', async () => {
    let currentPokemonId = parseInt(localStorage.getItem("pokemonId"));
    if (!currentPokemonId) return; // Si no hay un ID válido en localStorage, no hacer nada
    
    const newId = currentPokemonId + 1;
    const pokemon = await fetchPokemon(newId);
    
    // Almacenar el nuevo ID en localStorage
    localStorage.setItem("pokemonId", pokemon.id);
    
    // Mostrar la tarjeta del nuevo Pokémon
    displayPokemonCard(pokemon);
});

// Cargar el Pokémon al abrir la página si hay uno almacenado en localStorage
window.addEventListener('DOMContentLoaded', loadPokemonFromStorage);

