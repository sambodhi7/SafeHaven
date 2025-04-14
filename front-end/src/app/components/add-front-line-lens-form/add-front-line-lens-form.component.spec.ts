import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFrontLineLensFormComponent } from './add-front-line-lens-form.component';

describe('AddFrontLineLensFormComponent', () => {
  let component: AddFrontLineLensFormComponent;
  let fixture: ComponentFixture<AddFrontLineLensFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFrontLineLensFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFrontLineLensFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
