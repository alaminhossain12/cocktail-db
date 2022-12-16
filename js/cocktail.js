const loadDrinks = (search) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDrinks(data.drinks));
};

const displayDrinks = (drinks) => {
  // console.log(drinks);
  const drinksContainer = document.getElementById("drinks-container");
  drinksContainer.innerHTML = "";
  drinks.forEach((drink) => {
    // console.log(drink);
    const drinksDiv = document.createElement("div");
    drinksDiv.classList.add("col");
    drinksDiv.innerHTML = `
    <div onclick="loadDrinksDetails('${drink.idDrink}')" class="card">
    <img src="${drink.strDrinkThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h1>${drink.strCategory}</h1>
      <h4>${drink.strGlass}</h4>
      <h5 class="card-title">${drink.strDrink}</h5>
      <p class="card-text">
        ${drink.strInstructions.slice(0, 120)}
      </p>
    </div>
  </div>
    `;
    drinksContainer.appendChild(drinksDiv);
  });
};

const searchCocktail = () => {
  // console.log("Hello World");
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadDrinks(searchText);
  searchField.value = "";
};

const loadDrinksDetails = (idDrink) => {
  // console.log(idDrink);
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDrinksDetails(data.drinks[0]));
};

const displayDrinksDetails = (drink) => {
  // console.log(drink);
  const drinksDetails = document.getElementById("drinks-details");
  drinksDetails.innerHTML = "";
  const drinksDiv = document.createElement("div");
  drinksDiv.classList.add("card");
  drinksDiv.innerHTML = `
  <img src="${drink.strDrinkThumb}" class="card-img-top" alt="..." />
  <div class="card-body">
  <h1>${drink.strCategory}</h1>
  <h4>${drink.strGlass}</h4>
  <h5 class="card-title">${drink.strDrink}</h5>
  <p class="card-text">
    ${drink.strInstructions.slice(0, 120)}
  </p>
  </div>
  `;
  drinksDetails.appendChild(drinksDiv);
};

loadDrinks("r");
