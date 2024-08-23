let ingredientCount = 5;
let recipes = [];

async function fetchRecipes() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/antuanettaV/antuanettaV.github.io/main/test.json"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }
    recipes = await response.json();
    displayRecipes(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    alert("Failed to load recipes. Please try again later.");
  }
}

function displayRecipes(recipeArray) {
  const recipeGrid = document.getElementById("recipe-grid");
  recipeGrid.innerHTML = "";

  recipeArray.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";
    recipeCard.innerHTML = `
      <h2>${recipe.name}</h2>
      <img src="${recipe.pictureUrl}" alt="${
      recipe.name
    }" style="max-width: 100%; height: auto;" />
      <p>Ingredients:</p>
      <ul>
        ${recipe.ingredients
          .map(
            (ingredient) => `
          <li>
            ${ingredient.name} - ${ingredient.quantity || "N/A"} - DKK ${
              ingredient.price || "N/A"
            }
          </li>
        `
          )
          .join("")}
      </ul>
      <p>${recipe.description || ""}</p>
    `;
    recipeGrid.appendChild(recipeCard);
  });
}

document
  .getElementById("recipe-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const pictureUrl = document.getElementById("pictureUrl").value;
    const ingredients = [];

    for (let i = 1; i <= ingredientCount; i++) {
      const ingredient = document.getElementById(`ingredient${i}`).value;
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({ name: ingredient.trim() });
      }
    }

    const newRecipe = {
      id: Date.now(),
      name: title || "No title provided",
      description: description || "No description available",
      ingredients:
        ingredients.length > 0
          ? ingredients
          : [{ name: "No ingredients available" }],
      pictureUrl: pictureUrl || "",
    };

    recipes.push(newRecipe);

    displayRecipes(recipes);

    document.getElementById("recipe-form").reset();
    resetIngredientFields();
  });

function addIngredient() {
  ingredientCount++;

  const newIngredient = document.createElement("div");

  const label = document.createElement("label");
  label.setAttribute("for", `ingredient${ingredientCount}`);
  label.textContent = `Ingredient ${ingredientCount}: `;

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", `ingredient${ingredientCount}`);
  input.setAttribute("name", `ingredient${ingredientCount}`);

  newIngredient.appendChild(label);
  newIngredient.appendChild(input);

  document.getElementById("ingredients-container").appendChild(newIngredient);
}

document
  .getElementById("add_more_ingredient")
  .addEventListener("click", addIngredient);

function resetIngredientFields() {
  ingredientCount = 5;
  document.getElementById("ingredients-container").innerHTML = `
    <label for="ingredient1">Ingredient 1:</label>
    <input type="text" id="ingredient1" name="ingredient1" required><br><br>

    <label for="ingredient2">Ingredient 2:</label>
    <input type="text" id="ingredient2" name="ingredient2" required><br><br>

    <label for="ingredient3">Ingredient 3:</label>
    <input type="text" id="ingredient3" name="ingredient3" required><br><br>

    <label for="ingredient4">Ingredient 4:</label>
    <input type="text" id="ingredient4" name="ingredient4" required><br><br>

    <label for="ingredient5">Ingredient 5:</label>
    <input type="text" id="ingredient5" name="ingredient5" required><br><br>
  `;
}

async function searchRecipe() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  if (!recipes.length) {
    await fetchRecipes();
  }
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchInput)
  );

  displayRecipes(filteredRecipes);
}

document.getElementById("search").addEventListener("submit", function (event) {
  event.preventDefault();
  searchRecipe();
  document.getElementById("searchInput").value = "";
});

document
  .getElementById("search-recipe")
  .addEventListener("click", searchRecipe);

  function filterByIngredientCount(maxCount) {
    if (isNaN(maxCount) || maxCount < 1) {
      alert("Please enter a valid number of ingredients.");
      return;
    }
  
    const filteredRecipes = recipes.filter(
      (recipe) => recipe.ingredients.length <= maxCount
    );
  
    filteredRecipes.sort((a, b) => {
      if (a.ingredients.length < b.ingredients.length) {
        return -1;
      } 
      if (a.ingredients.length > b.ingredients.length) {
        return 1;
      }
      
      return 0;
    });
  
    displayRecipes(filteredRecipes);
  }
  

document
  .getElementById("sort-recipes-by-ingredient-count")
  .addEventListener("click", function () {
    const ingredientCountInput = parseInt(
      document.getElementById("ingredientCountInput").value,
      10
    );
    filterByIngredientCount(ingredientCountInput);
  });

document
  .getElementById("ingredient-search")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const ingredientSearchInput = document
      .getElementById("ingredientSearchInput")
      .value.trim()
      .toLowerCase();
    const results = searchIngredientPrice(ingredientSearchInput);
    displayIngredientPriceResults(results);
  });

function searchIngredientPrice(ingredientName) {
  const resultArray = [];

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.name.toLowerCase() === ingredientName) {
        resultArray.push({
          recipeName: recipe.name,
          ingredientName: ingredient.name,
          quantity: ingredient.quantity || "N/A",
          price: ingredient.price || "N/A",
        });
      }
    });
  });

  return resultArray;
}

function displayIngredientPriceResults(results) {
  const resultsContainer = document.getElementById("ingredient-price-results");
  resultsContainer.innerHTML = "";

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  const resultList = document.createElement("ul");
  results.forEach((result) => {
    const resultItem = document.createElement("li");
    resultItem.innerHTML = `
      <strong>${result.recipeName}</strong>: ${result.ingredientName} - ${result.quantity} - DKK ${result.price}
    `;
    resultList.appendChild(resultItem);
  });

  resultsContainer.appendChild(resultList);
}

let timerInterval;

function startTimer() {
  const timerInput = document.getElementById("timerInput").value;
  const timerDisplay = document.getElementById("timerDisplay");
  let timeLeft = parseInt(timerInput, 10);

  if (isNaN(timeLeft) || timeLeft <= 0) {
    alert("Please enter a valid number greater than 0.");
    return;
  }

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "Time's up!";
    } else {
      timerDisplay.textContent = `Time left: ${timeLeft--}s`;
    }
  }, 1000);
}

document.getElementById("start-timer").addEventListener("click", startTimer);

let pageStartTime = Date.now();
setInterval(() => {
  const pageTimeDisplay = document.getElementById("pageTimeDisplay");
  const timeSpent = Math.floor((Date.now() - pageStartTime) / 1000);
  pageTimeDisplay.textContent = `Time spent on page: ${timeSpent}s`;
}, 1000);

fetchRecipes();
