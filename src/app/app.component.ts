import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { NAV_ITEMS } from './nav-items';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

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
  // activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  constructor(private router: Router) {}

  onSelectItem(Item: string) {
    this.selectedItem = Item;
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
