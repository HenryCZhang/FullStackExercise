import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgURL = "https://cdn.pixabay.com/photo/2016/02/02/18/33/sphinx-1175828__340.jpg"; 
  constructor() { }

  ngOnInit(): void {
  }

}
