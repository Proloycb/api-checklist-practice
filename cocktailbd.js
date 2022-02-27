document.getElementById('spinner').style.display = 'none';
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchDetail = displayStyle => {
    document.getElementById('search-detail').style.display = displayStyle;
}
const searchDrink = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    // clear the value
    searchField.value = '';
    toggleSpinner('block');
    toggleSearchDetail('none');
    if(searchText == ''){
        return alert('Please add something');
    }
    else{
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displayResult(data.drinks);
    }
}


const displayResult = drinks => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(drinks == null){
        return alert('Please search valid drink');
    }
    drinks.forEach (drink => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick = "loadDrinkDetails(${drink.idDrink})" class="card h-100">
            <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${drink.strDrink}</h5>
                <p class="card-text">${drink.strInstructions.slice(0, 100)}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
    toggleSpinner('none');
}

const loadDrinkDetails = drinkId => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetailResult(data.drinks[0]));
}

const displayDetailResult = drink => {
    const searchDetails = document.getElementById('search-detail');
    searchDetails.textContent = '';
    toggleSearchDetail('block');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${drink.strDrink}</h5>
            <p class="card-text">${drink.strInstructions}</p>
        </div>
    `;
    searchDetails.appendChild(div);
}
