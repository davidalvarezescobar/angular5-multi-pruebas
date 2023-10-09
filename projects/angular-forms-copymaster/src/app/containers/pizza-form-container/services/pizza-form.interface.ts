export interface IPizzaFormInterface {
  selectedPizza?: IPizzaItem;
  pizzas: IPizzaItem[];
  customerDetails: ICustomerDetails;
}

export interface IToppingItem {
  name: PizzaToppingsEnum;
  selected: boolean;
}

export interface IPizzaItem {
  size: PizzaSizeEnum;
  toppings: IToppingItem[] | PizzaToppingsEnum[];
}

export interface ICustomerDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: {
    street: string;
    houseNum: string;
    city: string;
    floor: number;
  };
}

export enum PizzaSizeEnum {
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3
}

export enum PizzaToppingsEnum {
  SAUSAGE = 'Sausage',
  PEPPERONI = 'Pepperoni',
  HAM = 'Ham',
  OLIVES = 'Olives',
  BACON = 'Bacon',
  CORN = 'Corn',
  PINEAPPLE = 'Pineapple',
  MUSHROOMS = 'Mushrooms'
}
