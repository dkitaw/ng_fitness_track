import { Injectable } from "@angular/core";
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  private availableExdercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  getAvailableExercises() {
    return this.availableExdercises.slice();
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExdercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.exercises.push({ 
      ...this.runningExercise, 
      date: new Date(), 
      state: 'completed'
    });                                      // Push runningExercise to array before we set them to null and remove them
    this.runningExercise = null;           
    this.exerciseChanged.next(null);         // This will mean we got no running exercise
  }

  cancelExercise(progress: number) {
    this.exercises.push({ 
      ...this.runningExercise, 
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.duration * (progress / 100),
      date: new Date(), 
      state: 'cancelled'
    });                  
    this.runningExercise = null;           
    this.exerciseChanged.next(null); 
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }
}