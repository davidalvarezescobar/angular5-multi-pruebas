import { Pipe, PipeTransform } from '@angular/core';
import { from, groupBy, map, mergeMap, Observable, of, tap, toArray } from 'rxjs';

@Pipe({ name: 'group' })

export class GroupPipe implements PipeTransform {
  transform(arr: any, key: string): any {
    console.log('GroupPipe - executing for key:', key);

    // el operador 'from' va separando cada elemento del array original

    // 'groupBy' generará 2 observables distintos,
    // cuando llega el primer elemento con la key 'odd', generará el primero de los observables y
    // no será hasta que le llegue el primer elemento con la key 'even', que generará el segundo observable

    // importante: estoy acostumbrado a que 'mergeMap' reciba datos que son luego pasasados como parámetro al inner observable,
    // pero en esta ocasión 'mergeMap' recibe un observable;
    // cuando un 'mergeMap' recibe un observable, lo 'aplana' para obtener los datos del observable
    // esto lo podemos ver si hacemos ==> mergeMap(obs => obs), tap(datos => console.log)

    // por tanto 'mergeMap' se aplica a cada grupo generado por el 'groupBy', y toArray convierte los elementos del grupo en un array.
    // El resultado final es un array de arrays, donde cada sub-array contiene los elementos de un grupo específico.

    // por el 'Punto de control' pasarán sólo 2 nuevos elementos (cada uno de esos elementos es un array, uno con todos los 'odd' y otro con todos los 'even')

    // en lugar de entregar esos 2 elementos, los convertimos finalmente a un array (un array que a su vez tiene los otros 2 arrays)

    return from(arr).pipe(
      map((item, i) => {
        console.log(`Item número ${i} del array --> ${JSON.stringify(item)}`);
        return item;
      }),
      groupBy((elem: any) => elem[key]),
      tap((response: any) => console.log('El operador groupBy retorna un observable:', response)),
      mergeMap((obs: Observable<any>) => obs.pipe(
          toArray(),
          tap((response: any) => console.log(`Una vez que se han obtenido todos los datos del grupo ${response[0].type}, formamos un array:`, response)),
        )
      ),
      tap((response: any) => console.log('Punto de control:', response)),
      toArray(),
      tap((response: any) => console.log(response))
    );
  }
}