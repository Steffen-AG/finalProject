import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickComponentComponent } from './click-component.component';

describe('ClickComponentComponent', () => {
  let component: ClickComponentComponent;
  let fixture: ComponentFixture<ClickComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
