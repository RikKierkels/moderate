import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'moderate-landing-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
