import { Component, OnInit } from '@angular/core';
import Menu from './Menu';
import MENUS from './menu.repository';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menus : Menu[];

  constructor() { }

  ngOnInit() {
    this.getMenus();
  }

  getMenus(){
    this.menus = MENUS;
    console.log('menus ', this.menus);
  }

}
