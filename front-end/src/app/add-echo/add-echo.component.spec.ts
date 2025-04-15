import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEchoComponent } from './add-echo.component';

describe('AddEchoComponent', () => {
  let component: AddEchoComponent;
  let fixture: ComponentFixture<AddEchoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEchoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEchoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
