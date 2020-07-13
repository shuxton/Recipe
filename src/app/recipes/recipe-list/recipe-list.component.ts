import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
recipes: Recipe[]=[
  new Recipe('Thai','test','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWxDT6udBF3sCuxN3EqPh-cppdPFjFWmMhMA&usqp=CAU')
];
  constructor() { }

  ngOnInit(): void {
  }

}
