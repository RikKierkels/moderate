import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaGridItemComponent } from './idea-grid-item.component';

describe('IdeaGridItemComponent', () => {
  let component: IdeaGridItemComponent;
  let fixture: ComponentFixture<IdeaGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdeaGridItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
