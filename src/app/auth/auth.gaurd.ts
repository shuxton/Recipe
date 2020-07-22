import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router'
import {Injectable} from '@angular/core'
import { Observable } from 'rxjs'
import {AuthService} from './auth.service'
import { map, take } from 'rxjs/operators'

@Injectable({providedIn:"root"})
export class AuthGuard implements CanActivate{
   constructor(private router:Router,private authservice:AuthService){}
   
    canActivate(route:ActivatedRouteSnapshot,router:RouterStateSnapshot):boolean|Promise<boolean>|Observable<boolean|UrlTree>{
return this.authservice.user.pipe(take(1),map(user=>{
  const isAuth=!!user;
  if(isAuth)return true;
  return this.router.createUrlTree(['/auth'])
}))
    }
}