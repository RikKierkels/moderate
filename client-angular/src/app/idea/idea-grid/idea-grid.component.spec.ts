import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IdeaGridComponent } from './idea-grid.component';

describe('IdeaGridComponent', () => {
  let component: IdeaGridComponent;
  let fixture: ComponentFixture<IdeaGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdeaGridComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
