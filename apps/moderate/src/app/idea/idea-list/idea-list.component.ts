import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IdeaService } from '../idea.service';

@Component({
  selector: 'mod-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaListComponent implements OnInit {
  ideas$ = this.ideaService.getAll();
  constructor(private readonly ideaService: IdeaService) {}

  ngOnInit() {}
}
