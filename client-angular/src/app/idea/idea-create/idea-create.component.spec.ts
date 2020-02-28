import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaCreateComponent } from './idea-create.component';

describe('IdeaCreateComponent', () => {
  let component: IdeaCreateComponent;
  let fixture: ComponentFixture<IdeaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdeaCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
