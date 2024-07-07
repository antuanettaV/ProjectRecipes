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

    const name = document.getElementById("name").value;
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
      name,
      description,
      ingredients,
      pictureUrl,
    };

    displayRecipe(newRecipe);
    document.getElementById("recipe-form").reset();
    resetIngredientFields();
  });

function addIngredient() {
  ingredientCount++;

  const newIngredient = document.createElement("div");
  newIngredient.innerHTML = `
    <label for="ingredient${ingredientCount}">Ingredient ${ingredientCount}:</label>
    <input type="text" id="ingredient${ingredientCount}" name="ingredient${ingredientCount}"><br><br>
  `;

  document.getElementById("ingredients-container").appendChild(newIngredient);
}

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
