import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'mod-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  userProfile$ = this.authService.userProfile$;

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
