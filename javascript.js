const recipe = {
  id: 1,
  name: "Risalamande",
  pictureUrl:
    "https://denmark.dk/-/media/websites/denmarkdk/people-and-culture/danish-christmas-recipes/webbilleder/risalamande.ashx?mw=1600&hash=BA7D0C45FED7BAC10782B64A2E71E43B",
  ingredients: [
    "1 litre whole milk",
    "2.5 dl short grain white rice",
    "Pinch salt",
    "½ litre heavy cream",
    "150 g almonds",
    "2 tbsp sugar",
    "2 whole vanilla beans",
    "Danish cherry sauce",
  ],
  description:
    "Slowly bring the milk and rice to a boil while stirring. Add a pinch of salt. Reduce the heat and simmer for about 40 minutes. Remember to stir frequently. Refrigerate until the following day. Pour boiling water over the almonds and soak for 10 minutes. Then remove the almond skins and coarsely chop all but the largest and best whole almond, which will be in the bowl of the lucky winner later that evening.Split the vanilla beans and scrape out the seeds. Lightly whip the heavy cream in a separate large bowl. Gently fold the chopped almonds, vanilla sugar and whipped cream into the cold rice porridge. Serve with heated Danish cherry sauce.",
};

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
displayRecipe(recipe);

let ingredientCount = 5;

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
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    const newRecipe = {
      id: Date.now(),
      name: title,
      description,
      ingredients,
      pictureUrl: pictureUrl,
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

  const br1 = document.createElement("br");
  const br2 = document.createElement("br");

  newIngredient.appendChild(label);
  newIngredient.appendChild(input);
  newIngredient.appendChild(br1);
  newIngredient.appendChild(br2);

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

let recipes = [
  {
    title: "Fresh Watermelon Salad",
    ingredients: ["watermelon", "mint", "red onion", "baby salad leaves", "feta"],
  },
  {
    title: "Strawberry Tart",
    ingredients: ["marzipan", "sugar", "butter", "eggs", "flour", "vanilla sugar", "chocolate", "strawberries"],
  },
  {
    title: "Potato Salad",
    ingredients: ["potatoes", "asparagus", "chives", "onion", "radishes", "sour cream", "mayonnaise", "mustard", "salt", "pepper"],
  },
  {
    title: "Apple Trifle",
    ingredients: ["apples", "water", "vanilla powder", "lemon juice", "sugar", "breadcrumbs", "butter", "double cream"],
  },
];

function displayRecipes(recipeArray) {
  const recipeGrid = document.getElementById("recipe-grid");
  recipeGrid.innerHTML = "";

  recipeArray.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";
    recipeCard.innerHTML = `
      <h2>${recipe.title}</h2>
      <p>Ingredients:</p>
      <ul>
        ${recipe.ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")}
      </ul>
    `;
    recipeGrid.appendChild(recipeCard);
  });
}

document.getElementById("search").addEventListener("submit", function (event) {
  event.preventDefault();
  searchRecipe();
  document.getElementById("searchInput").value = "";
});

document
  .getElementById("search-recipe")
  .addEventListener("click", searchRecipe);

function searchRecipe() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchInput)
  );
  displayRecipes(filteredRecipes);
}

function sortRecipes() {
  const sortedRecipes = [...recipes].sort(
    (a, b) => a.ingredients.length - b.ingredients.length
  );
  displayRecipes(sortedRecipes);
}

displayRecipes(recipes);
document.addEventListener('DOMContentLoaded', () => {
  let countdown;

  const timerDisplay = document.getElementById('timerDisplay');
  const pageTimeDisplay = document.getElementById('pageTimeDisplay');

  window.startTimer = function() {
      const input = document.getElementById('timerInput').value;

      if (countdown) {
          clearInterval(countdown);
      }

      let timeLeft = parseInt(input);

      if (isNaN(timeLeft) || timeLeft <= 0) {
          alert('Please enter a valid number greater than 0');
          return;
      }

      timerDisplay.textContent = `Time left: ${timeLeft}s`;

      countdown = setInterval(() => {
          timeLeft--;
          timerDisplay.textContent = `Time left: ${timeLeft}s`;

          if (timeLeft <= 0) {
              clearInterval(countdown);
              alert('Time is up!');
              timerDisplay.textContent = `Time left: 0s`;
          }
      }, 1000);
  }
  
  const userJoined = new Date();
  
  setInterval(() => {
      const now = new Date();
      const pageTime = Math.floor((now - userJoined) / 1000); 
      pageTimeDisplay.textContent = `Time spent on page: ${pageTime}s`;
  }, 1000);
});