import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IdeasService } from '../ideas.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Idea } from '@moderate/api-interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'mod-idea-create',
  templateUrl: './idea-create.component.html',
  styleUrls: ['./idea-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaCreateComponent {
  ideaForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    difficulty: [null]
  });

  constructor(
    private formBuilder: FormBuilder,
    private ideasService: IdeasService,
    private router: Router
  ) {}

  createIdea(): void {
    const idea = this.ideaForm.value as Idea;
    this.ideasService
      .create(idea)
      .subscribe(() => this.router.navigate(['/ideas/list']));
  }
}
