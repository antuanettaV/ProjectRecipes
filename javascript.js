const recipe = {
  id: 1,
  name: "Risalamande",
  pictureUrl: "https://denmark.dk/-/media/websites/denmarkdk/people-and-culture/danish-christmas-recipes/webbilleder/risalamande.ashx?mw=1600&hash=BA7D0C45FED7BAC10782B64A2E71E43B",
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
  description: "Slowly bring the milk and rice to a boil while stirring. Add a pinch of salt. Reduce the heat and simmer for about 40 minutes. Remember to stir frequently. Refrigerate until the following day. Pour boiling water over the almonds and soak for 10 minutes. Then remove the almond skins and coarsely chop all but the largest and best whole almond, which will be in the bowl of the lucky winner later that evening. Split the vanilla beans and scrape out the seeds. Lightly whip the heavy cream in a separate large bowl. Gently fold the chopped almonds, vanilla sugar, and whipped cream into the cold rice porridge. Serve with heated Danish cherry sauce.",
};

let recipes = [
  {
    name: "Fresh Watermelon Salad",
    ingredients: ["watermelon", "mint", "red onion", "baby salad leaves", "feta"],
    pictureUrl: "https://www.madbanditten.dk/wp-content/uploads/2023/06/vandmelonsalat-2-600x400.jpg",
    description: "Remove the skin from the watermelon and cut into small wedges. In a large bowl, toss the watermelon, mint, red onion, salad leaves. Place in a serving bowl and crumble the feta on top."
  },
  {
    name: "Strawberry Tart",
    ingredients: ["marzipan", "sugar", "butter", "eggs", "flour", "vanilla sugar", "chocolate", "strawberries"],
    pictureUrl: "https://denmark.dk/-/media/websites/denmarkdk/people-and-culture/recipes/strawberrytart.ashx?mw=480&hash=251FC8A6118AC0F298E4294BECA043AF",
    description: "Grate the marzipan and mix thoroughly with the sugar. Whip the mixture with butter until fluffy. Whip the eggs into the mixture and then fold the flour into the dough. Line an approximately 24 cm springform pan with baking paper and grease with butter. Then roll out the dough and transfer to the pan. Bake in the middle of the oven for approximately 25 minutes. Prepare the vanilla custard while the dough bakes. Finely chop the chocolate and sprinkle over the shell after baking. Spread out the chocolate with a spatula as it melts. Allow the shell to cool to room temperature. Mix vanilla sugar, egg yolks, sugar, and corn starch in a saucepan. Turn the heat to medium and whisk in the milk. Heat the mixture while stirring until it thickens. Transfer the custard to a container and cool completely. Whip the double cream to a light foam and fold it into the cooled vanilla custard. Rinse the strawberries, remove the stems, and quarter from top to bottom. Spread the vanilla custard in a thick layer on top of the tart shell. Top with the fresh strawberries."
  },
  {
    name: "Potato Salad",
    ingredients: ["potatoes", "asparagus", "chives", "onion", "radishes", "sour cream", "mayonnaise", "mustard", "salt", "pepper"],
    pictureUrl: "https://denmark.dk/-/media/websites/denmarkdk/people-and-culture/recipes/potatosaladedit.ashx?mw=480&hash=5876C4D0D561C91563EBD7FBA565AAB9",
    description: "Boil potatoes in lightly salted water for 10 to 12 minutes. Drain water when a potato speared with a fork and lifted out of the water easily glides off the fork and falls back into the pot. Let potatoes stand and cool. Break off and discard the stringy ends of the asparagus spears, then chop into small pieces. You can pour boiling water over the chopped asparagus and let it soak for 2 minutes if you prefer a less raw taste. Finely chop chives, red onion, and radishes. Stir the dressing ingredients together and season with salt and pepper. Reserve some of the chives for garnish and combine the rest of the vegetables with the dressing. Season with salt and pepper, garnish with chives, and serve as a side dish."
  },
  {
    name: "Apple Trifle",
    ingredients: ["apples", "water", "vanilla powder", "lemon juice", "sugar", "breadcrumbs", "butter", "double cream"],
    pictureUrl: "https://denmark.dk/-/media/websites/denmarkdk/people-and-culture/recipes/appletrifleedit.ashx?mw=1600&hash=7286C629E54195551ABF6439BADF42B9",
    description: "Cook the apples with water, vanilla powder, lemon juice, and sugar until soft. Layer the cooked apples with toasted breadcrumbs and whipped cream."
  },
];

recipes.push(recipe);

function displayRecipes(recipeArray) {
  const recipeGrid = document.getElementById("recipe-grid");
  recipeGrid.innerHTML = "";

  recipeArray.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";
    recipeCard.innerHTML = `
      <h2>${recipe.name}</h2>
      <img src="${recipe.pictureUrl}" alt="${recipe.name}" style="max-width: 100%; height: auto;" />
      <p>Ingredients:</p>
      <ul>
        ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
      </ul>
      <p>${recipe.description || ""}</p>
    `;
    recipeGrid.appendChild(recipeCard);
  });
}

displayRecipes(recipes);

let ingredientCount = 5;

document.getElementById("recipe-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const pictureUrl = document.getElementById("pictureUrl").value;
  const ingredients = [];

  
  for (let i = 1; i <= ingredientCount; i++) {
    const ingredient = document.getElementById(`ingredient${i}`).value;
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(ingredient.trim());
    }
  }

    const newRecipe = {
    id: Date.now(),
    name: title || "No title provided",
    description: description || "No description available",
    ingredients: ingredients.length > 0 ? ingredients : ["No ingredients available"],
    pictureUrl: pictureUrl || ""
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

document.getElementById("add_more_ingredient").addEventListener("click", addIngredient);


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

document.getElementById("search").addEventListener("submit", function (event) {
  event.preventDefault();
  searchRecipe();
  document.getElementById("searchInput").value = "";
});


document.getElementById("search-recipe").addEventListener("click", searchRecipe);

function searchRecipe() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchInput)
  );
  displayRecipes(filteredRecipes);
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


let pageStartTime = Date.now();
setInterval(() => {
  const pageTimeDisplay = document.getElementById("pageTimeDisplay");
  const timeSpent = Math.floor((Date.now() - pageStartTime) / 1000);
  pageTimeDisplay.textContent = `Time spent on page: ${timeSpent}s`;
}, 1000);

