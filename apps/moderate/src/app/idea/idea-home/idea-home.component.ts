import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mod-idea-home',
  templateUrl: './idea-home.component.html',
  styleUrls: ['./idea-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaHomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
