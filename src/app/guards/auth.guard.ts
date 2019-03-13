import { Injectable }     from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable }     from 'rxjs';
import { AuthService }    from '../services/auth.service';
//import { Storage }        from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private AuthService: AuthService,
    //private storage: Storage,
    private route: Router
  ){}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
     
      
      if(!this.AuthService.isLoggedIn){
        this.route.navigate(['/']);
      }
     
      return true;
      //return this.AuthService.isLoggedIn;
     
    }
    

}
