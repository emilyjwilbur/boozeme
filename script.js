const searchBtn = document.getElementById("search-btn");
const drinkList = document.getElementById("drink");
const drinkDetailsContent = document.querySelector(".drink-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event listeners

searchBtn.addEventListener("click", getDrinkList);
drinkList.addEventListener("click", getDrinkRecipe);
recipeCloseBtn.addEventListener("click", () => {
  drinkDetailsContent.parentElement.classList.remove("showRecipe");
});

// get book list that matches with info
function getDrinkList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let html = "";
      if (data.drinks) {
        data.drinks.forEach((drink) => {
          html += `
                <div class="drink-item" data-id="${drink.idDrink}">
                        <div class="drink-img">
                            <img src="${drink.strDrinkThumb}" alt="drink">
                        </div>
                        <div class="drink-name">
                            <h3>${drink.strDrink}</h3>
                            <a href="#" class="recipe-btn">About this drink</a>
                        </div>
                    </div> 
                `;
        });
        drinkList.classList.remove('notFound');
      } else {
        html = "Bummer, we don't have that drink!";
        drinkList.classList.add('notFound');
      }

      drinkList.innerHTML = html;
    });
}

// get drink recipe

function getDrinkRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let drinkItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => drinkRecipeModal(data.drinks));
  }
}

// create modal

function drinkRecipeModal(drink) {
  console.log(drink);
  drink = drink[0];
  let html = `
    <h2 class = "drink-title">${drink.strDrink}</h2>
    <p class = "drink-category">${drink.strCategory}</p>
    <p class = "drink-ingredient"> ${drink.strMeasure1}${drink.strIngredient1}</p>
    <p class = "drink-ingredient">${drink.strMeasure2}${drink.strIngredient2}</p>
    <p class = "drink-ingredient">${drink.strMeasure3}${drink.strIngredient3}</p>
    <p class = "drink-ingredient">${drink.strMeasure4}${drink.strIngredient4}</p>
    <p class = "drink-ingredient">${drink.strMeasure5}${drink.strIngredient5}</p>
    <div class = "drink-instruct">
        <h3>Instructions:</h3>
        <p>${drink.strInstructions}</p>
    </div>
    <div class = "recipe-drink-img">
        <img src = "${drink.strDrinkThumb}" alt = "">
    </div>
    <div class = "recipe-link">
        
    </div>
    `;
  drinkDetailsContent.innerHTML = html;
  drinkDetailsContent.parentElement.classList.add("showRecipe");
}
