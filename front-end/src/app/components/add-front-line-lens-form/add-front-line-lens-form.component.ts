import { NgModule , signal} from '@angular/core';
import { Component , } from '@angular/core';
import {WebcamModule, WebcamImage} from "ngx-webcam"
import { AudioRecorderComponent } from '../audio-recorder/audio-recorder.component';
import { Observable, Subject , take} from 'rxjs';
import {GooglemapComponent} from "../googlemap/googlemap.component";


@Component({
  selector: 'app-add-front-line-lens-form',
  imports: [WebcamModule, AudioRecorderComponent,GooglemapComponent],
  templateUrl: './add-front-line-lens-form.component.html',
  styleUrl: './add-front-line-lens-form.component.css'
})
export class AddFrontLineLensFormComponent {
  private trigger: Subject<void> = new Subject<void>();
  capturedImage: WebcamImage | null = null;
  lat  = signal(0);
  lng = signal(0);
 
 
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("Sa");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.lat.set(position.coords.latitude)
        this.lng.set(position.coords.longitude)
        },
    )
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

 

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    this.capturedImage = webcamImage;
  }

  reset(){
    this.capturedImage = null;
  }
}
