import { Ingredient } from '../shared/ingredients.model'
import { Subject } from 'rxjs';


export class ShoppingListService{
    ingredientsChanged=new Subject<Ingredient[]>();
    startedEditing=new Subject<number>();

    ingredients:Ingredient[]=[
        new Ingredient('Apples',5),
        new Ingredient('Melon',1)
      ];

getIngredients(){
    return this.ingredients.slice();
}

getIngredient(index:number){
    return this.ingredients.slice()[index]
}

addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
}

updateIngredient(index:number,newIngredient:Ingredient){
this.ingredients[index]=newIngredient;
this.ingredientsChanged.next(this.ingredients.slice())
}

addIngredients(ingredients:Ingredient[]){
this.ingredients.push(...ingredients);
this.ingredientsChanged.next(this.ingredients.slice())
}

deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice())
}


}