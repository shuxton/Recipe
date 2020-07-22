import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { RecipeService } from '../recipes/recipe.service'
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';


@Injectable({
    providedIn:"root"
})
export class DataStorageService{
     url="[database url]"
constructor(private authService:AuthService,private recipeService:RecipeService,private http:HttpClient){}
storeRecipes(){
    const recipes=this.recipeService.getRecipes();
    this.http.put(this.url,recipes).subscribe(res=>{
        console.log(res)
    })
}
    
fetchRecipes(){
   return this.authService.user.pipe(take(1),exhaustMap(user=>{
        return  this.http.get<Recipe[]>(this.url)

    .pipe(
    map(recipes=>{
        return recipes.map(recipe=>{
            return {...recipe,ingredients:recipe.ingredients?recipe.ingredients:[]}
        })

        }),tap(recipes=>{
           this.recipeService.setRecipes(recipes);
    }))}))
    
}


}