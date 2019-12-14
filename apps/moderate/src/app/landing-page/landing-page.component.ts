import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'moderate-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
