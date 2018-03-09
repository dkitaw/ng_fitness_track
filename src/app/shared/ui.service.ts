import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {
   
  /**
   * Event listener wraps boolean to 
   * indicate whether loading started 
   * or finished. 
   */
  loadingStateChanged = new Subject<boolean>();         

  constructor(private snackbar: MatSnackBar) { }

  showSnackbar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration: duration
    });
  }
}