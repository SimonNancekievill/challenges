export type Ingredient = {
  name: string;
  amountGrams: number;
};

export type Recipe = {
  name: string;
  servings: number;
  vegeterian: boolean;
  ingredients: Ingredient[];
};
