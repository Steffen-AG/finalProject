import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumComponent } from './user-form.component';

describe('ForumComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<ForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
