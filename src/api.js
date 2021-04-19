const baseUrl = "https://geronimo-recipes.herokuapp.com";

export async function getRecipes() {
  try {
    let response = await fetch(`${baseUrl}/recipes`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

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

export async function getRecipeById(id) {
  try {
    let response = await fetch(`${baseUrl}/recipe/${id}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

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
