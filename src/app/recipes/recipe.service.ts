import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{

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

}