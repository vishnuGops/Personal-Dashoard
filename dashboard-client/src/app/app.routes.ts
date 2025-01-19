import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: '**', redirectTo: '' } // redirect to home page if no route found
];