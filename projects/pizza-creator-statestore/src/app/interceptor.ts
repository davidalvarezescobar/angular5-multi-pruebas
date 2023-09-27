import { PreloaderService } from './preloader.service';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap, delay } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private preloaderService: PreloaderService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.preloaderService.showLoader(req);

        return next.handle(req)
            .pipe(
                delay(Math.random() * 4000),
                finalize(() => this.preloaderService.hideLoader(req))
            );
    }
}
