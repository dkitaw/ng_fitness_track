import { Injectable } from "@angular/core";
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from "rxjs";
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExdercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) { }

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()                       // event lister which contain some metadata
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            duration: doc.payload.doc.data().duration,
            calories: doc.payload.doc.data().calories
          };
        })
      })
      .subscribe((exercises: Exercise[]) => {
        this.uiService.loadingStateChanged.next(false);
        this.availableExdercises = exercises;
        this.exercisesChanged.next([...this.availableExdercises]);
      }, error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
        this.exerciseChanged.next(null);
      }));        
  }

  startExercise(selectedId: string) { 
   // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});              // doc() is when we want to selec one single document, if we want then should call collection()
    this.runningExercise = this.availableExdercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({ 
      ...this.runningExercise, 
      date: new Date(), 
      state: 'completed'
    });                                            // Push runningExercise to array before we set them to null and remove them
    this.runningExercise = null;           
    this.exerciseChanged.next(null);         // This will mean we got no running exercise
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({ 
      ...this.runningExercise, 
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(), 
      state: 'cancelled'
    });                  
    this.runningExercise = null;           
    this.exerciseChanged.next(null); 
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
    .collection('finishedExercises')
    .valueChanges()
    .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
    }));                                                              // valueChanges() give us array of document values without id of doc
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}