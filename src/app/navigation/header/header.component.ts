import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /** listen to sidenavToggle */
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Emit any event whenever 
   * we click the menu button
   */
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
