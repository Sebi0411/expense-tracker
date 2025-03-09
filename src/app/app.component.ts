import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { NAV_ITEMS } from './nav-items';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, HeaderComponent, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'expense-tracker';
  selectedItem = 'Monday';
  Items = NAV_ITEMS;
  isAuthRoute = false;

  constructor(private router: Router) {
    const item = sessionStorage.getItem('selectedItem');
    if (item) {
      this.selectedItem = JSON.parse(item);
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isAuthRoute = event.url === '/login' || event.url === '/signup';
      });
  }

  onSelectItem(Item: string) {
    this.selectedItem = Item;
    sessionStorage.setItem('selectedItem', JSON.stringify(Item));
  }

  get isFirstItem(): boolean {
    return this.selectedItem === this.Items[0].id;
  }

  get isLastItem(): boolean {
    return this.selectedItem === this.Items[this.Items.length - 1].id;
  }

  get nextItem() {
    const currentIndex = this.Items.findIndex(
      (Item) => Item.id === this.selectedItem
    );
    const nextIndex = currentIndex + 1;
    return this.Items[nextIndex].id;
  }

  get previousItem() {
    const currentIndex = this.Items.findIndex(
      (Item) => Item.id === this.selectedItem
    );
    const previousIndex = currentIndex - 1;
    return this.Items[previousIndex].id;
  }

  onPreviousItem() {
    const currentIndex = this.Items.findIndex(
      (Item) => Item.id === this.selectedItem
    );
    const previousIndex = currentIndex - 1;
    this.selectedItem = this.Items[previousIndex].id;
    if (this.selectedItem === 'Summary') {
      this.router.navigate(['/Summary']);
    } else {
      this.router.navigate(['/expenses', this.selectedItem]);
    }
  }

  onNextItem() {
    const currentIndex = this.Items.findIndex(
      (Item) => Item.id === this.selectedItem
    );
    const previousIndex = currentIndex + 1;
    this.selectedItem = this.Items[previousIndex].id;
    if (this.selectedItem === 'Summary') {
      this.router.navigate(['/Summary']);
    } else {
      this.router.navigate(['/expenses', this.selectedItem]);
    }
  }
}
