
  function userInput(event){
    if(event=="Enter"){
        searchFood()
    }
  }
const searchFood = async () => {
  const searchInput = document.getElementById("search-input");
 
  const searchInputText = searchInput.value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`;
  if (searchInputText == "") {
    document.getElementById("error-message2").style.display = "block";
  } else {
    // clear input
    searchInput.value = "";
    document.getElementById("error-message2").style.display = "none";
    try {
      const res = await fetch(url);
      const data = await res.json();
      displaySearchResult(data.meals);
    } catch (e) {
        document.getElementById("error-message").style.display = "block";
    }
  }
};

const displaySearchResult = (meals) => {
  // console.log(meals)
  const resultContainer = document.getElementById("search-result-box");
  resultContainer.textContent = "";
  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = ` <div onclick="getMealDetail('${meal.idMeal}')" class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        </div>
      </div> `;
    resultContainer.appendChild(div);
  });
};

const getMealDetail=async(mealId)=>{
   const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    
   const res=await fetch(url);
   const data=await res.json();
   displayMealDetails(data.meals[0])
}

const displayMealDetails=(meal)=>{
    const mealDetailsContainer=document.getElementById('meal-details');
    const div=document.createElement('div')
    div.classList.add('card');
    div.innerHTML=`<img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
      <a class="btn btn-primary" href="${meal.strYoutube}" target="_blank">Go somewhere</a>
    </div>`;
    mealDetailsContainer.appendChild(div);

}