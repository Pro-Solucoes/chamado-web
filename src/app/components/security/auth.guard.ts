import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SharedService} from '../../services/shared/shared.service';
import {UsuarioService} from '../../services/usuario/usuario.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  public shared: SharedService;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.shared = SharedService.getInstance();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.shared.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
