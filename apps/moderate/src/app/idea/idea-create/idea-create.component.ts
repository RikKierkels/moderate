import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mod-idea-create',
  templateUrl: './idea-create.component.html',
  styleUrls: ['./idea-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaCreateComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
