import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailHelpComponent } from './avail-help.component';

describe('AvailHelpComponent', () => {
  let component: AvailHelpComponent;
  let fixture: ComponentFixture<AvailHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailHelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
