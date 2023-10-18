export type Topping = string; // S?LO ES UN DATO, POR ESO EST? COMO type EN LUGAR DE interface
export interface Pizza {
  name: string;
  toppings: Topping[];
}
export interface PizzaState {
  pizzas: Pizza[];
  toppings: Topping[];
  selectedToppings: Topping[];
}
