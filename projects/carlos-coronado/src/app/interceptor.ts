import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable, tap } from 'rxjs';
import { PreloaderService } from "./providers/preloader.service";

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private preloaderService: PreloaderService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
            .pipe(
                tap( this.logger(req) ),
                finalize(() => this.preloaderService.hideLoader())
            );

        // ANGULAR HttpClient Documentation-way
        //
        // const started = Date.now();
        // let ok: string;
        // return next.handle(req)
        //     .pipe(
        //         tap(
        //             // Operation OK
        //             event => {
        //                 ok = event instanceof HttpResponse ? 'succeeded' : '';
        //             },
        //             // Operation KO; error is an HttpErrorResponse
        //             error => {
        //                 ok = 'failed'
        //             }
        //         ),
        //         // Log when response observable either completes or errors
        //         finalize(() => {
        //             const elapsed = Date.now() - started;
        //             const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
        //             console.log(msg);
        //             this.preloaderService.hideLoader();
        //         })
        //     );
    }

    // My-way
    logger(req) {
        this.preloaderService.showLoader();
        console.log('Interceptor request:', req);
        return (res) => { // callback function
            if (res.type !== 0) {
                console.log('Interceptor response:', res);
            }
        };
    }
}
