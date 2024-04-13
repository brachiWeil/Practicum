
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './class/Employee';
import { Role } from './class/Role';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
 
  constructor(private _http: HttpClient) { }
  getRoles():Observable<Role[]>{
      return this._http.get<Role[]>('https://localhost:7066/api/Role')
  }

  addRole(role:Role){
    return this._http.post('https://localhost:7066/api/Role', role)
  }
}
