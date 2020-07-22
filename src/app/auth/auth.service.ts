import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Subject, pipe, BehaviorSubject } from 'rxjs'
import {User} from './user.model'
import { catchError, tap } from 'rxjs/operators'
import { Router } from '@angular/router'

interface AuthResponseData{
    kind:string,
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean,
}

@Injectable({providedIn:"root"})
export class AuthService{
user=new BehaviorSubject<User>(null)
private TokenTimer:any;

    constructor(private router:Router,private http:HttpClient){}

    signUp(email:string,password:string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[api key]',{
            email:email,
            password:password,
            returnSecureToken:true,
        }).pipe(tap(resData=>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)

        }))
    }

    private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
        const expirationDate=new Date(new Date().getTime()+ expiresIn*1000)
        const user=new User(email,userId,token,expirationDate)
        this.user.next(user);
        this.autoLogout(expiresIn*1000)
        localStorage.setItem('userData',JSON.stringify(user))
    }

autoLogin(){
    console.log("yo")
   const userData:{
       email:string;
       id:string;
       _token:string;
       _tokenExpirationDate:string
   }= JSON.parse(localStorage.getItem('userData'))
if(!userData)return
const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
if(!loadedUser.token){
    this.user.next(loadedUser)
   const expirationDate=new Date(userData._tokenExpirationDate).getTime()-new Date().getTime()
    this.autoLogout(expirationDate)
}
}

    login(email:string,password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[api key]',{
             email:email,
             password:password,
             returnSecureToken:true,
         }).pipe(tap(resData=>{
this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
         })
         )
     }

autoLogout(expirationDuration:number){
this.TokenTimer=setTimeout(()=>{
this.logout()
},expirationDuration)
}

     logout(){
         this.user.next(null)
         this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
       if(this.TokenTimer)clearTimeout(this.TokenTimer)
       this.TokenTimer=null
}
}