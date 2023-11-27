import { Pipe, PipeTransform } from '@angular/core';
import { from, groupBy, mergeMap, Observable, of, tap, toArray } from 'rxjs';

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

    // por el 'Punto de control' pasarán sólo 2 nuevos elementos (cada uno de esos elementos es un array, uno con todos los 'odd' y otro con todos los 'even')

    // en lugar de entregar esos 2 elementos, los convertimos finalmente a un array (un array que a su vez tiene los otros 2 arrays)

    return from(arr).pipe(
      tap((response: any) => console.log('Elemento separado del array:', response)),
      groupBy((elem: any) => elem[key]),
      tap((response: any) => console.log('Operador groupBy:', response)),
      mergeMap((obs: Observable<any>) => obs.pipe(
          tap((response: any) => console.log('Los datos van pasando por aquí uno a uno:', response)),
          toArray(),
          tap((response: any) => console.log('Como no nos interesan los datos individualmente, formamos un array:', response)),
        )
      ),
      tap((response: any) => console.log('Punto de control:', response)),
      toArray(),
      tap((response: any) => console.log(response))
    );
  }
}