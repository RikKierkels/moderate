import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mod-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
