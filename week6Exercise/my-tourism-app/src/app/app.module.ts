import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CitiesComponent } from './components/cities/cities.component';
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { ImportantTextDirective } from './directives/important-text.directive';
import { TechIdeasComponent } from './components/tech-ideas/tech-ideas.component';

const routes: Routes =[
   {path:'',redirectTo:'/home',pathMatch:'full'}, //deafult - home page
   {path:'home',component:HomeComponent},
   {path:'cities',component:CitiesComponent},
   {path:'weather',component:WeatherComponent},
   {path:'weather-details',component:WeatherDetailsComponent},
   {path:'techIdeas',component:TechIdeasComponent},
   {path:"weather/:name/:springN/:springM/:summerN/:summerM/:winterN/:winterM/:autumnN/:autumnM/:visitFrom/:visitTo",component:WeatherDetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CitiesComponent,
    WeatherComponent,
    WeatherDetailsComponent,
    ImportantTextDirective,
    TechIdeasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
