import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
recipesChanged=new Subject<Recipe[]>()

  private  recipes: Recipe[]=[
        new Recipe('Thai','Delicious extravaganza','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWxDT6udBF3sCuxN3EqPh-cppdPFjFWmMhMA&usqp=CAU'
        ,[new Ingredient('Tomato',3)])
      ];

constructor(private slService:ShoppingListService){}

getRecipes(){
    return this.recipes.slice();
}

getRecipe(index:number){
return this.recipes.slice()[index]
}

addIngredientsToShoppingList(ingredients:Ingredient[]){
this.slService.addIngredients(ingredients)
}

addRecipe(recipe:Recipe){
  this.recipes.push(recipe)
  this.recipesChanged.next(this.recipes.slice())
}

updateRecipe(index:number,newRecipe:Recipe){
  this.recipes[index]=newRecipe
  this.recipesChanged.next(this.recipes.slice())

}

deleteRecipe(index:number){
  this.recipes.splice(index,1);
  this.recipesChanged.next(this.recipes.slice())
}

}