import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDonationsComponent } from './public-donations.component';

describe('PublicDonationsComponent', () => {
  let component: PublicDonationsComponent;
  let fixture: ComponentFixture<PublicDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicDonationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
