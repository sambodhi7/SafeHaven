import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontlineLensComponent } from './frontline-lens.component';

describe('FrontlineLensComponent', () => {
  let component: FrontlineLensComponent;
  let fixture: ComponentFixture<FrontlineLensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontlineLensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontlineLensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
