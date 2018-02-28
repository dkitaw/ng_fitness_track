import { Injectable } from "@angular/core";
import { Exercise } from "./exercise.model";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  
  private availableExdercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  private runningExercise: Exercise;
    
  getAvailableExercises() {
    return this.availableExdercises.slice();
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExdercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({...this.runningExercise});
  }
}