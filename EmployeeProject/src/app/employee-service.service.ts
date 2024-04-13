
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Employee } from "./class/Employee";
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    constructor(private _http: HttpClient, private _router: Router) { }
    private apiUrl = 'https://localhost:7066/api/Employees';
    token: any;
    headers: any;
    authorization() {
        if (typeof sessionStorage !== 'undefined' && sessionStorage?.getItem("token")) {
            this.token = sessionStorage?.getItem("token")
            this.headers = new HttpHeaders({ 'Authorization': this.token });
        }
    }

    getEmployeeList(): Observable<Employee[]> {
        this.authorization()
        return this._http.get<Employee[]>(`${this.apiUrl}`);
    }

    getEmployeeId(id: string): Observable<Employee> {
        this.authorization()
        return this._http.get<Employee>(`${this.apiUrl}/${id}`);
    }

    addEmployee(newEmployee: Employee): Observable<Employee> {
        this.authorization()
        return this._http.post<Employee>(`${this.apiUrl}`, newEmployee, { "headers": this.headers });
    }

    updateEmployee(id: string,employee:Employee){
          return this._http.put(`https://localhost:7066/api/Employees/${id}`,employee,{ "headers": this.headers })
        }

    deleteEmployee(id: string): Observable<void> {
        this.authorization()
        return this._http.delete<void>(`${this.apiUrl}/${id}`, { "headers": this.headers });
    }
}
