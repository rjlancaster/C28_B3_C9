

// 1. this function isn't working in the loop below.  Why??
const foodAsHTML = (name, ethnicity, type) => `
<div class="foods">
  <h2>${name}</h2>
  <p>${ethnicity}</p>
  <p>${type}</p>
</div>
`

// I need to come back and figure out why my fragment function isn't working.  I'll tackle it later.

fetch("http://localhost:8088/food/")
.then(foods => foods.json())
.then(json => {
  console.table(json)
  // 2 create const A which acts as fragment container.
  const fragment = document.createDocumentFragment()
  // 3  create const B that acts as query selector and grabs the ID or class.  you will be appending the child HTML content in some form or fashion to this const (probably usng another variable)
  const addFoodToDom = document.querySelector(".foodList");
  // 4  create loop to loop through D array
  for (let i = 0; i < json.length; i++) {
    // 5  create let C that will be used to create section element
      let foodObject = json[i];
      // 6 se C to attach to attach elements and what not.  Have it equal D looped which contains the meat . 
      // debugger
      let food = foodAsHTML(foodObject.name, foodObject.ethnicity, foodObject.type)
      // 7 Set A.appendChild(C)
      // fragment.appendChild(food);
      // 8 close loop
      addFoodToDom.innerHTML += food;
    }
    // 9 et B.appendChild(A)
    // addFoodToDom.appendChild(fragment);
  })
  
  

