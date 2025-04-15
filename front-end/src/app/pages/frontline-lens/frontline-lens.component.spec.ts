import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontlineLensComponent } from './frontline-lens.component';
import { AddFrontLineLensFormComponent } from '../../components/add-front-line-lens-form/add-front-line-lens-form.component';
import { GooglemapComponent } from '../../components/googlemap/googlemap.component';
describe('FrontlineLensComponent', () => {
  let component: FrontlineLensComponent;
  let fixture: ComponentFixture<FrontlineLensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontlineLensComponent, AddFrontLineLensFormComponent, GooglemapComponent]
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
