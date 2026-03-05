import { HttpInterceptorFn, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();
  console.log(`[HTTP] ${req.method} ${req.url}`);

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          const elapsed = Date.now() - startTime;
          console.log(`[HTTP] ${req.method} ${req.url} → ${event.status} (${elapsed}ms)`);
        }
      },
      error: (err) => {
        const elapsed = Date.now() - startTime;
        console.error(`[HTTP] ${req.method} ${req.url} → ERROR ${err.status} (${elapsed}ms)`, err.message);
      }
    })
  );
};
