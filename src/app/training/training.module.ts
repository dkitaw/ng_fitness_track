import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from "../material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

import { StopTrainingComponent } from "./stop-training/stop-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { TrainingComponent } from "./training.component";
import { AngularFirestoreModule } from "angularfire2/firestore";

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFirestoreModule,
  ],
  exports: [],
  entryComponents: [StopTrainingComponent]      // This is an array where you have to add all components that are never instantiated by using their selector in your template not event by routing.
  
})
export class TrainingModule {

}