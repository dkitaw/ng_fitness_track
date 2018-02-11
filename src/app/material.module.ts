import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule
    ]                         // app-module will have access to all the modules exported in the material
})
export class MaterialModule {

}