import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaHomeComponent } from './idea-home.component';

describe('IdeaHomeComponent', () => {
  let component: IdeaHomeComponent;
  let fixture: ComponentFixture<IdeaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdeaHomeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
