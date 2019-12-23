import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IdeaService } from '../idea.service';
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
    private readonly formBuilder: FormBuilder,
    private readonly ideaService: IdeaService,
    private readonly router: Router
  ) {}

  createIdea(): void {
    const idea = this.ideaForm.value as Idea;
    this.ideaService
      .create(idea)
      .subscribe(() => this.router.navigate(['/ideas/list']));
  }
}
