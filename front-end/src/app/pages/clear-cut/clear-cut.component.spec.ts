import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearCutComponent } from './clear-cut.component';

describe('ClearCutComponent', () => {
  let component: ClearCutComponent;
  let fixture: ComponentFixture<ClearCutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearCutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearCutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
