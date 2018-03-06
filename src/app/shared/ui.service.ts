import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class UIService {
   
  /**
   * Event listener wraps boolean to 
   * indicate whether loading started 
   * or finished. 
   */
  loadingStateChanged = new Subject<boolean>();           
}