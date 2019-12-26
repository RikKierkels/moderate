import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Idea } from '@moderate/api-interfaces';

@Component({
  selector: 'mod-idea-list-item',
  templateUrl: './idea-list-item.component.html',
  styleUrls: ['./idea-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaListItemComponent {
  @Input() idea: Idea;

  constructor() {}
}
