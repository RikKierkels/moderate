import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IdeaService } from '../idea.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Idea } from '@moderate/api-interfaces';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../../shared/can-deactivate.guard';

@Component({
  selector: 'mod-idea-create',
  templateUrl: './idea-create.component.html',
  styleUrls: ['./idea-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaCreateComponent implements CanComponentDeactivate {
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
    this.ideaService.create(idea).subscribe({
      next: createdIdea => this.router.navigate([`ideas`, createdIdea.id]),
      error: () => this.router.navigate(['ideas'])
    });
  }

  canDeactivate(): boolean {
    // TODO: Show modal
    return true;
  }
}
