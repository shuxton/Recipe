import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import {Recipe} from '../recipe.model'
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
subscription:Subscription

  recipes: Recipe[]
  constructor(private recipeService: RecipeService,
              private router:Router,
              private route:ActivatedRoute) { }
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  ngOnInit(): void {
   this.subscription= this.recipeService.recipesChanged.subscribe((
      recipes:Recipe[]
    )=>{
      this.recipes=recipes;
    })
    this.recipes=this.recipeService.getRecipes();
  }

onNewRecipe(){
  this.router.navigate(['new'],{relativeTo:this.route})
}

}
