type Ingredient = {
  name: string;
  amountGrams: number;
};

type Recipe = {
  name: string;
  servings: number;
  vegeterian: boolean;
  ingredients: Ingredient[];
};

const recipe1: Recipe = {
  name: "Apple Pie",
  servings: 4,
  vegeterian: true,
  ingredients: [
    { name: "apple", amountGrams: 500 },
    { name: "flour", amountGrams: 250 },
    { name: "oatmilk", amountGrams: 150 },
  ],
};

const recipe2: Recipe = {
  name: "Cheese Cake",
  servings: 6,
  vegeterian: true,
  ingredients: [
    { name: "flour", amountGrams: 300 },
    { name: "creme", amountGrams: 220 },
    { name: "oatmilk", amountGrams: 330 },
  ],
};

function summarize(): string {
  console.log(``);
}
