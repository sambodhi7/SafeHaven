import { NgModule , signal} from '@angular/core';
import { Component , } from '@angular/core';
import {WebcamModule, WebcamImage} from "ngx-webcam"
import { AudioRecorderComponent } from '../audio-recorder/audio-recorder.component';
import { Observable, Subject , take, zip} from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmFormFieldComponent } from '@spartan-ng/ui-formfield-helm';
import { GooglemapComponent } from '../googlemap/googlemap.component';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';



@Component({
  selector: 'app-add-front-line-lens-form',
  imports: [ WebcamModule, AudioRecorderComponent,ReactiveFormsModule,HlmInputDirective,HlmLabelDirective, GooglemapComponent],
  templateUrl: './add-front-line-lens-form.component.html',
  styleUrl: './add-front-line-lens-form.component.css'
})
export class AddFrontLineLensFormComponent {
  private trigger: Subject<void> = new Subject<void>();
  capturedImage: WebcamImage | null = null;
  lat  = signal(0);
  lng = signal(0);
  audioBlob = signal(null);

  
  form : FormGroup ;

  constructor (private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: [''],
      message: [''],
    })
    this.form.valueChanges.subscribe(
       value=>console.log(value)
    )
  }
 
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
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

 

  takePicture(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    this.capturedImage = webcamImage;
  }

  reset(){
    this.capturedImage = null;
  }

  toggle(){
    if(this.capturedImage)this.reset()
    else this.takePicture()
  }

  submit(){
    if(this.form.valid && this.capturedImage){
    
      let formdata = new FormData()
      formdata.append(
        'title', this.form.get('title')!.value
      )
      formdata.append(
        'message', this.form.get('message')!.value
      )
      formdata.append('image', this.dataURItoBlob(this.capturedImage?.imageAsDataUrl), 'image.jpeg')
      if(this.audioBlob()!=null){
        formdata.append('audio', this.audioBlob()!, 'audio.wav')
      }

      console.log(formdata)
      fetch("http://127.0.0.1:5000/api/post/front-line-lens", {method:'POST',
        body: formdata
      })

    }
    else{
      alert("Invalid form")
    }
  }

  dataURItoBlob(dataURI:string) {
    console.log(dataURI)
    const base64Data = dataURI.split(',')[1];
    const byteString = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
   return blob;
  }

}
