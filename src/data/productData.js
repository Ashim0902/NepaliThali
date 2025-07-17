const productDataApi = async (setProductData) => {
  const request = await fetch("https://dummyjson.com/recipes");
  const response = await request.json();
  if (request.status == 200) {
    setProductData(response.recipes);
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();

    if (response.status === 200) {
      // Transform the recipes data to match our application structure
      const transformedData = data.recipes.map((recipe) => ({
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        price: Math.round(recipe.prepTimeMinutes / 2) + 5, // Convert prep time to reasonable price
        rating: recipe.rating || 4.5,
        description: recipe.instructions
          ? recipe.instructions.slice(0, 2).join(". ") + "."
          : "Delicious traditional recipe",
        category: recipe.cuisine || "Traditional",
        ingredients: recipe.ingredients || [
          "Fresh ingredients",
          "Premium quality",
          "Authentic spices",
        ],
        cookingTime: `${recipe.cookTimeMinutes || 30} mins`,
        difficulty: recipe.difficulty || "Medium",
        servings: recipe.servings || 4,
        prepTimeMinutes: recipe.prepTimeMinutes || 15,
        cookTimeMinutes: recipe.cookTimeMinutes || 30,
        instructions: recipe.instructions || [
          "Prepare ingredients",
          "Follow cooking steps",
          "Serve hot",
        ],
        tags: recipe.tags || [recipe.cuisine || "Traditional"],
        mealType: recipe.mealType || ["Main Course"],
        caloriesPerServing: recipe.caloriesPerServing || 300,
      }));

      return transformedData;
    }
    return [];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const searchProducts = (query, products) => {
  if (!query.trim()) return products;

  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(lowercaseQuery)
      )
  );
};

export default productDataApi;
