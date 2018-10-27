

const foodAsHTML = (name, ingredients, country, sugar) => `
<div class="foods">
  <h2>${name}</h2>
  <p>Ingredients: ${ingredients}</p>u
  <p>Country of origin: ${country}</p>
  <p>Sugar per serving: ${sugar}</p>
</div>
`
fetch("http://localhost:8088/food/")
.then(foods => foods.json())
.then(json => {
  console.table(json)
  const addFoodToDom = document.querySelector(".foodList");
  for (let i = 0; i < json.length; i++) {
    let foodObject = json[i];
    let barcode = foodObject.barcode;
    
    fetch(`https://world.openfoodfacts.org/api/v0/product/` + barcode)
    .then(response => response.json())
    .then(productInfo => {
      let ingredients = []
      let country = productInfo.product.countries;
      let sugar = productInfo.product.nutriments.sugars_serving;
      for (let i = 0; i < productInfo.product.ingredients.length; i++) {
        ingredients.push(productInfo.product.ingredients[i].text);
      }
      let parsedData = { ingredients, country, sugar };
      return parsedData;
    })
    
    .then(parsedData=> {
      let food = foodAsHTML(foodObject.name, parsedData.ingredients, parsedData.country, parsedData.sugar);
      return food;
    })
    .then(food => {
      addFoodToDom.innerHTML += food;
    })
  }
})
