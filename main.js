let recipes = []; 
let ingredientCount = 5; 

async function fetchRecipes() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/antuanettaV/antuanettaV.github.io/main/test.json'); 
    if (!response.ok) throw new Error('Network response was not ok');
    recipes = await response.json();
    displayRecipes(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

function displayRecipe(recipe) {
  const container = document.getElementById("recipe-container");
  const recipeElement = document.createElement("div");
  recipeElement.className = "recipe";

  const title = document.createElement("h2");
  title.textContent = recipe.name;
  recipeElement.appendChild(title);

  const description = document.createElement("p");
  description.textContent = recipe.description;
  recipeElement.appendChild(description);

  const img = document.createElement("img");
  img.src = recipe.pictureUrl;
  img.alt = recipe.name;
  recipeElement.appendChild(img);

  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.textContent = "Ingredients:";
  recipeElement.appendChild(ingredientsTitle);

  const ingredientsList = document.createElement("ul");
  recipe.ingredients.forEach((ingredient) => {
    const listItem = document.createElement("li");
    listItem.textContent = ingredient;
    ingredientsList.appendChild(listItem);
  });
  recipeElement.appendChild(ingredientsList);

  container.appendChild(recipeElement);
}

function displayRecipes(recipeArray) {
  const recipeGrid = document.getElementById("recipe-grid");
  recipeGrid.innerHTML = "";

  recipeArray.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";
    recipeCard.innerHTML = `
      <h2>${recipe.name}</h2>
      <p>Ingredients:</p>
      <ul>
        ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
      </ul>
    `;
    recipeGrid.appendChild(recipeCard);
  });
}

async function addNewRecipe(newRecipe) {
  try {
    const response = await fetch('https://raw.githubusercontent.com/antuanettaV/antuanettaV.github.io/main/test.json', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe),
    });
    if (!response.ok) throw new Error('Failed to add new recipe');
    const addedRecipe = await response.json();
    recipes.push(addedRecipe); 
    displayRecipes(recipes); 
  } catch (error) {
    console.error('Error adding new recipe:', error);
  }
}

document.getElementById("recipe-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const pictureUrl = document.getElementById("pictureUrl").value;
  const ingredients = [];

  for (let i = 1; i <= ingredientCount; i++) {
    const ingredient = document.getElementById(`ingredient${i}`).value;
    if (ingredient) ingredients.push(ingredient);
  }

  const newRecipe = {
    id: Date.now(),
    name: title,
    description,
    ingredients,
    pictureUrl
  };

  addNewRecipe(newRecipe);
  document.getElementById("recipe-form").reset();
  resetIngredientFields();
});

document.getElementById("search").addEventListener("submit", function (event) {
  event.preventDefault();
  searchRecipe();
});

document.getElementById("search-recipe").addEventListener("click", searchRecipe);
document.getElementById("sort-recipes").addEventListener("click", sortRecipes);

function searchRecipe() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchInput)
  );
  displayRecipes(filteredRecipes);
}

function sortRecipes() {
  const sortedRecipes = [...recipes].sort(
    (a, b) => a.ingredients.length - b.ingredients.length
  );
  displayRecipes(sortedRecipes);
}

async function fetchIngredientPrice(ingredientName) {
  try {
    const response = await fetch(`https://api.example.com/ingredient-price?name=${encodeURIComponent(ingredientName)}`);
    if (!response.ok) throw new Error('Failed to fetch ingredient price');
    const data = await response.json();
    return data.price; 
  } catch (error) {
    console.error('Error fetching ingredient price:', error);
    return 'Price not available';
  }
}

async function searchIngredient() {
  const ingredientSearchInput = document.getElementById("ingredientSearchInput").value;
  const priceContainer = document.getElementById("ingredient-price-container");
  priceContainer.innerHTML = ''; 

  const price = await fetchIngredientPrice(ingredientSearchInput);
  const priceElement = document.createElement("p");
  priceElement.textContent = `Price for ${ingredientSearchInput}: ${price}`;
  priceContainer.appendChild(priceElement);
}

document.getElementById("ingredient-search").addEventListener("submit", function (event) {
  event.preventDefault();
  searchIngredient();
});

function startTimer() {
  const timerInput = document.getElementById("timerInput").value;
  const timerDisplay = document.getElementById("timerDisplay");
  
  let timeLeft = parseInt(timerInput, 10);
  timerDisplay.textContent = `Time left: ${timeLeft}s`;
  
  const interval = setInterval(() => {
    timeLeft -= 1;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    
    if (timeLeft <= 0) {
      clearInterval(interval);
      timerDisplay.textContent = "Time's up!";
    }
  }, 1000);
}

document.getElementById("start-timer").addEventListener("click", startTimer);

let startTime = Date.now();

function updatePageTime() {
  const pageTimeDisplay = document.getElementById("pageTimeDisplay");
  if (!pageTimeDisplay) return; 

  let timeSpent = Math.floor((Date.now() - startTime) / 1000);
  pageTimeDisplay.textContent = `Time spent on page: ${timeSpent}s`;
}

setInterval(updatePageTime, 1000);

document.addEventListener('DOMContentLoaded', fetchRecipes);