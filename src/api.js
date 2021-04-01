const baseUrl = "https://ekl1s.sse.codesandbox.io";

// GET /recipes - підтримка кверей search і filter
// GET /recipe/:id
// GET /categories - якогось дефолтного набору категорій немає, вони виймаються із кожного нового рецепту й додаються у спільне сховище
// POST /recipe - айдішка додається автоматом
// POST /reset - ресет файлового сховища до тих 2 рецептів, що в тебе на репо, та їхніх категорій

//https://ekl1s.sse.codesandbox.io/recipes
export async function getRecipes() {
  try {
    let response = await fetch(`${baseUrl}/recipes`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

//https://ekl1s.sse.codesandbox.io/recipes/?search=lasagna&filter=Meat&filter=Cakes
export async function searchRecipes(name, categories) {
  const categoriesQuery = categories
    .map((category) => `&filter=${category}`)
    .join("");

  try {
    let response = await fetch(
      `${baseUrl}/recipes/?search=${name}${categoriesQuery}`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

//https://ekl1s.sse.codesandbox.io/recipe/dce0f279-fff5-4348-9c23-e130d1abdcb7
export async function getRecipeById(id) {
  try {
    let response = await fetch(`${baseUrl}/recipe/${id}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

//https://ekl1s.sse.codesandbox.io/categories
export async function getCategories() {
  try {
    let response = await fetch(`${baseUrl}/categories`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function postNewRecipe(newRecipe) {
  try {
    await fetch(`${baseUrl}/recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newRecipe),
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function reset() {
  try {
    await fetch(`${baseUrl}/reset`, {
      method: "POST",
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function getFavoriteRecipes(idList) {
  let recipes = [];
  for (let id of idList) {
    await fetch(`${baseUrl}/recipe/${id}`)
      .then(
        (successResponse) => {
          return successResponse.json();
        },
        (failResponse) => {
          return console.log(failResponse);
        }
      )
      .then((recipe) => (recipes = [...recipes, recipe]));
  }
  let results = await Promise.all(recipes);
  return results;
}
