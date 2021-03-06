import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  userProfile$ = this.authService.userProfile$;

  constructor(private readonly authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
