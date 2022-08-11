import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

    url = "http://localhost:3000/signin"

  //get
  //post
  sigin(user: User):Observable<any>{
    return this.httpClient.post(
      this.url,             //url
      JSON.stringify(user), //body
      {                     //options
        headers: new HttpHeaders({"Content-Type": "application/json"}),
        observe: 'response'
      } 
    )
  }
  //put
  //delete
}
