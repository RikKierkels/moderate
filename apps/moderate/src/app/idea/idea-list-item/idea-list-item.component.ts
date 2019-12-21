import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mod-idea-list-item',
  templateUrl: './idea-list-item.component.html',
  styleUrls: ['./idea-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaListItemComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
