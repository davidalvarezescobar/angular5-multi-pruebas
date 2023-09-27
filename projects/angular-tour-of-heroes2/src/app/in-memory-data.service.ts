import { Hero } from './hero';

export class InMemoryDataService implements InMemoryDataService {

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(heroe => heroe.id)) + 1 : 1;
  }

  createDb() {
    const heroes: Hero[] = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];

    const prueba = {
      podemos: 'tener multiples bbdd'
    };

    return { heroes, prueba };
  }
}
