import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';

import { StopTrainingComponent } from "./stop-training/stop-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { TrainingComponent } from "./training.component";
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from "./training-routing.module";

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    TrainingRoutingModule
  ],
  exports: [],
  entryComponents: [StopTrainingComponent]      // This is an array where you have to add all components that are never instantiated by using their selector in your template not event by routing.
})
export class TrainingModule {

}