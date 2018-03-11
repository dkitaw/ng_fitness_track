import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'training', loadChildren: './training/training.module#TrainingModule' }     // Path to the module which we want to load lazily and access to the #class (TraningModule)
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {
    
}