import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  http=inject(HttpClient);

    register(name:string,email:string,password:string){
      return this.http.post(environment.apiUrl+"/auth/register",{
name,email,password
      })
    }
     login(email:string,password:string){
      return this.http.post(environment.apiUrl+"/auth/login",{
      email,password
      })
    }

    get isLoggedIn(){
      let userData = localStorage.getItem("token");
      if(userData){
        return true;
    }
    return false;
    }

     get isAdmin(){
      let userData = localStorage.getItem("user");
    if(userData){
      return JSON.parse(userData).isAdmin;
    }
    return false;
    }
    
    get userName(){
    let user = localStorage.getItem("user");
    if(user){
      return JSON.parse(user).name;
    }
    return null;
    }
    get userEmail(){
    let user = localStorage.getItem("user");
    if(user){
      return JSON.parse(user).email;
    }
    return null;
    }

    logout(){
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

  }

