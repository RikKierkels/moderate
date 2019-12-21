import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaListComponent } from './idea-list.component';

describe('IdeaListComponent', () => {
  let component: IdeaListComponent;
  let fixture: ComponentFixture<IdeaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdeaListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
