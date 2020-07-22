import {Component} from '@angular/core'
import { NgForm } from '@angular/forms';
import {AuthService} from './auth.service'
import { Router } from '@angular/router';

@Component({
selector:'app-auth',
templateUrl:'./auth.component.html'
})
export class AuthComponent{
isLoginMode=true;

constructor(private router:Router,private authService:AuthService){}

onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
}

onSubmit(form:NgForm){
    const email=form.value.email
    const password=form.value.password
if(this.isLoginMode){
    this.authService.login(email,password).subscribe(resData=>{
        this.router.navigate(['/recipes'])

    },error=>{
        console.log(error)
    })
}else{
    this.authService.signUp(email,password).subscribe(resData=>{
this.router.navigate(['/recipes'])
},error=>{
    console.log(error)
})
}
    form.reset()
}

}