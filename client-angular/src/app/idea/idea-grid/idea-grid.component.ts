import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IdeaService } from '../idea.service';

@Component({
  selector: 'app-idea-grid',
  templateUrl: './idea-grid.component.html',
  styleUrls: ['./idea-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaGridComponent implements OnInit {
  ideas$ = this.ideaService.getAll();
  constructor(private readonly ideaService: IdeaService) {}

  ngOnInit() {}
}
