const recipe1 = {
  name: "Apple Pie",
  servings: 4,
  vegeterian: true,
  ingredients: [
    { name: "apple", amountGrams: 500 },
    { name: "flour", amountGrams: 250 },
    { name: "oatmilk", amountGrams: 150 },
  ],
};
const recipe2 = {
  name: "Cheese Cake",
  servings: 6,
  vegeterian: true,
  ingredients: [
    { name: "flour", amountGrams: 300 },
    { name: "creme", amountGrams: 220 },
    { name: "oatmilk", amountGrams: 330 },
  ],
};
function summarize(recipe) {
  console.log(
    `To bake a ${recipe.name} for ${recipe.servings} persons you need ${recipe.ingredients.map(
      (ingredient) => {
        `return ${ingredient.amountGrams} of ${ingredient.name}`;
      },
    )}.`,
  );
}
summarize(recipe2);
//# sourceMappingURL=recipes.js.map
