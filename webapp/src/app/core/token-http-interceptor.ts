import { HttpInterceptor, HttpInterceptorFn } from "@angular/common/http";

export const tokenHttpInterceptor:HttpInterceptorFn = (req,next) => {
   const token=localStorage.getItem('token');
   //local storage bata token nikalyo
   if(token){
    req = req.clone({
        setHeaders:{
            Authorization:token,
        }
    });
   }
    return next(req);//return next.handle(req);

}
