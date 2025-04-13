import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicesOfWarComponent } from './voices-of-war.component';

describe('VoicesOfWarComponent', () => {
  let component: VoicesOfWarComponent;
  let fixture: ComponentFixture<VoicesOfWarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoicesOfWarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoicesOfWarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
