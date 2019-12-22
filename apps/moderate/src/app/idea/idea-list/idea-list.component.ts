import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IdeasService } from '../ideas.service';

@Component({
  selector: 'mod-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaListComponent implements OnInit {
  ideas$ = this.ideasService.getAll();
  constructor(private ideasService: IdeasService) {}

  ngOnInit() {}
}
