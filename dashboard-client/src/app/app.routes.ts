import { Routes } from '@angular/router';
import {LandingComponent} from './landing.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: "**", redirectTo: ''} // redirect to home page if no route found
];
