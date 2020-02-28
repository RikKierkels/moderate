import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tag } from '@moderate/api-interfaces';

@Component({
  selector: 'mod-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  @Input() tag: Tag;
}
