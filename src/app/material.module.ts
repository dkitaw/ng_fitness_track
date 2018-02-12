import { NgModule } from '@angular/core';
import { 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule 
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
        
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
    ]                         // app-module will have access to all the modules exported in the material
})
export class MaterialModule {

}