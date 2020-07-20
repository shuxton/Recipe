import {Injectable} from '@angular/core'
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import {Recipe} from './recipe.model'
import { DataStorageService } from '../shared/data-storage.service'
import { RecipeService } from './recipe.service'

@Injectable({providedIn:"root"})
export class RecipeResolverService implements Resolve<Recipe[]>{
constructor(private recipeService:RecipeService,private dataStorageService:DataStorageService){}

resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    if(this.recipeService.getRecipes().length==0)
    return this.dataStorageService.fetchRecipes()
    else return this.recipeService.getRecipes()
}
}