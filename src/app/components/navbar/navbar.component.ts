import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  drawer:boolean
  constructor() { }

  ngOnInit() {
  }

  toggleDrawer():void {
    this.drawer = !this.drawer
  }

}
