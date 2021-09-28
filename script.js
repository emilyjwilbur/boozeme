
const searchBtn = document.getElementById('search-btn');
const drinkList = document.getElementById('drink');
const drinkDetailsContent = document.getElementById('recipe-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


// event listeners

searchBtn.addEventListener('click', getDrinkList);
drinkList.addEventListener('click', getDrinkRecipe);
recipeCloseBtn.addEventListener('click', () => {
    drinkDetailsContent.parentElement.classList.remove('showRecipe');
});


// get book list that matches with info
function getDrinkList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then (data => {
        console.log(data)
        let html = "";
        if(data.drinks){
            data.drinks.forEach(drink => {
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
        }else {
            html="Oops, we don't have that drink!";
            drinkList.classList.add('notFound');
        }

        drinkList.innerHTML = html;
    });
}

// get drink recipe

function getDrinkRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let drinkItem = e.target.parentElement.parentElement;
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i==${drinkItem.dataset.id}`)
        .then(response => response.json())
        .then(data => drinkRecipeModal(data.drinks));
    }
}

// create modal

function drinkRecipeModal(drink) {
    console.log(drink);
    drink = drink[0];
    let html = `
    <h2 class = "drink-title">${drink.strMeal}</h2>
    <p class = "drink-category">${drink.strCategory}</p>
    <div class = "drink-instruct">
        <h3>Instructions:</h3>
        <p>${drink.strInstructions}</p>
    </div>
    <div class = "recipe-drink-img">
        <img src = "${drink.strMealThumb}" alt = "">
    </div>
    <div class = "recipe-link">
        <a href = "${drink.strYoutube}" target = "_blank">Watch Video</a>
    </div>
    `;
    drinkDetailsContent.innerHTML = html;
    drinkDetailsContent.parentElement.classList.add('showRecipe');
}





// "use strict";

// // prettier-ignore


// const form = document.querySelector(".book-details");
// const containerWorkouts = document.querySelector(".book-details");
// const inputType = document.querySelector(".book-details");
// const inputDistance = document.querySelector(".book-details");
// const inputDuration = document.querySelector(".book-details");
// const inputCadence = document.querySelector(".book-details");
// const inputElevation = document.querySelector(".book-details");

// let map, mapEvent;

// if (navigator.geolocation)
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       const { latitude } = position.coords;
//       const { longitude } = position.coords;
//       console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//       const coords = [latitude, longitude]

//       map = L.map("map").setView(coords, 13);

//       L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);

//     //   handling clicks on map
//         map.on('click', function(mapE) {
//             mapEvent = mapE;
//          form.classList.remove('hidden')
//             inputDistance.focus();
//         })
//     },
//     function () {
//       alert("Could not get your location");
//     }
//   );


//   form.addEventListener('submit', function(e) {
//       e.preventDefault();

//     // Clear input fields
//     inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';


//     //   Display marker
//        console.log(mapEvent);

//             const {lat, lng} = mapEvent.latlng;

//             L.marker([lat, lng])
//             .addTo(map)
//             .bindPopup(L.popup({
//                 maxWidth: 250,
//                 minWidth: 100,
//                 autoClose: false,
//                 closeOnClick: false,
//                 className: 'running-popup',
//             }))
//             .setPopupContent('Workout')
//             .openPopup();
//   })

//   inputType.addEventListener('change', function() {
//       inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
//       inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
//   })