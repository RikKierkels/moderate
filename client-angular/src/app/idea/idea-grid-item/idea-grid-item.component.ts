import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Idea } from '../../shared/interfaces/idea.interface';

@Component({
  selector: 'app-idea-grid-item',
  templateUrl: './idea-grid-item.component.html',
  styleUrls: ['./idea-grid-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaGridItemComponent {
  @Input() idea: Idea;
}
