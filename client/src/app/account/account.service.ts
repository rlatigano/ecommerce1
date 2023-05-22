import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currrentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currrentUserSource.asObservable();
  
  constructor(private http: HttpClient, private router:Router) { }

  loadCurrentUser(token:string | null)
  {
    if(token === null){
      this.currrentUserSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(this.baseUrl + 'account', {headers}).pipe(
      map( user => {
        if(user){
          localStorage.setItem('token', user.token);
          this.currrentUserSource.next(user);
          return user;

        }else{
          return null;
        }
        
      })
    ) 
  }

  login(values: any)
  {
      return this.http.post<User>(this.baseUrl + 'account/login',values).pipe(
        map( user => {
          localStorage.setItem('token', user.token);
          this.currrentUserSource.next(user);
        })
      )

  }

  register(values: any )
  {
    return this.http.post<User>(this.baseUrl + 'account/register',values).pipe(
      map( user => {
        localStorage.setItem('token', user.token);
        this.currrentUserSource.next(user);
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.currrentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string){

    return this.http.get<Boolean>(this.baseUrl + 'account/emailExists?email=' + email);
    
    
  }
}
