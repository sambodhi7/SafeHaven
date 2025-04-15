import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchoeOfSilenceComponent } from './echoe-of-silence.component';
import {NgxMeteorsComponent} from "@omnedia/ngx-meteors"


describe('EchoeOfSilenceComponent', () => {
  let component: EchoeOfSilenceComponent;
  let fixture: ComponentFixture<EchoeOfSilenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EchoeOfSilenceComponent, NgxMeteorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EchoeOfSilenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
