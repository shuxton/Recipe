import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service'
import { from, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit,OnDestroy{
  private userSub:Subscription
isAuthenticated=false

    collapsed=true;

    constructor(private authService:AuthService,private dataStorageService:DataStorageService){}
    ngOnDestroy(): void {
       this.userSub.unsubscribe()
    }
    ngOnInit(): void {
this.userSub=this.authService.user.subscribe(user=>{
this.isAuthenticated=!user?false:true;
}) }

onLogout(){
    this.authService.logout()
}

    onSaveData(){
this.dataStorageService.storeRecipes()
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe()
    }

}