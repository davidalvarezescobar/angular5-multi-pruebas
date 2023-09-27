export interface Pizza {
  name: string;
  toppings: string[];
}

export type Topping = string;             // se puede "tipar" por tipo de contenido, que en este caso seria un string...
// export type Saludo = 'hola' | 'adios'; // ... o especificando directamente los valores que va a soportar
