import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NAV_ITEMS } from '../nav-items';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  @Output() select = new EventEmitter<string>();
  @Input({required: true}) selectedItem!: string;

  items = NAV_ITEMS;

  onSelectItem(item: string) {
    this.selectedItem = item;
    this.select.emit(item);
  }

}
