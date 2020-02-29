import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-idea-detail',
  templateUrl: './idea-detail.component.html',
  styleUrls: ['./idea-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaDetailComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
