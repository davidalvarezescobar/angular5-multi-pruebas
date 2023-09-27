import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

    // sólo utilizo el interceptor para logear pero,
    // lógicamente se puede hacer todo tipo de modificaciones a la petición http y a la respuesta hhtp
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            // con un tap, sólo podemos modificar la respuesta http
            // tap(_x => console.log('Interceptor: sólo respuesta', _x)),
            map( this.logIntercept(req) )
        );
    }

    // con una función que retorna una función, podemos...
    logIntercept(req) {
        console.log('Interceptor request:', req); // ...ver y/o modificar la petición http
        return (res: HttpEvent<any>) => {
            console.log('Interceptor response:', res); // ...y también ver y/o modificar la respuesta http
            return res;
        };
    }

}
