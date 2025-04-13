import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhereNamesRestComponent } from './where-names-rest.component';

describe('WhereNamesRestComponent', () => {
  let component: WhereNamesRestComponent;
  let fixture: ComponentFixture<WhereNamesRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhereNamesRestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhereNamesRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
