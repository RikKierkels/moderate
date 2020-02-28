import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tag } from '../../interfaces/tag.interface';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  @Input() tag: Tag;
}
