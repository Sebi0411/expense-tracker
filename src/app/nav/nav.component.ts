import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NAV_ITEMS } from '../nav-items';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  @Output() select = new EventEmitter<string>();
  @Input({ required: true }) selectedItem!: string;

  items = NAV_ITEMS;

  constructor(private authService: AuthService, private router: Router) {}

  onSelectItem(item: string) {
    this.selectedItem = item;
    this.select.emit(item);
  }

  onLogout() {
    this.authService.logout();
    this.select.emit(this.items[0].id);
    this.router.navigate(['/login']);
  }
}
