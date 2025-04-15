import { Component, signal } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {NgxRippleComponent} from "@omnedia/ngx-ripple"
import { NgxDotpatternComponent } from '@omnedia/ngx-dotpattern';
import {NgxMeteorsComponent} from "@omnedia/ngx-meteors";
import { ReactiveFormsModule } from '@angular/forms';
import { AudioRecorderComponent } from '../../components/audio-recorder/audio-recorder.component';
@Component({
  selector: 'app-echoe-of-silence',
  imports: [NgxRippleComponent,AudioRecorderComponent,ReactiveFormsModule],
  templateUrl: './echoe-of-silence.component.html',
  styleUrl: './echoe-of-silence.component.css'
})
export class EchoeOfSilenceComponent {
  showModal = signal(false)
  audioBlob = signal(null)
  echos = signal([])
  form : FormGroup ;
  constructor (private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: [''],
      message: [''],
      author : ['']
    });
    this.form.valueChanges.subscribe(
      value=>{
        fetch(value.image).then(res=>res.blob()).then(console.log)
      }
    )
  }

  load(){
    fetch("http://127.0.0.1:5000/api/get/echos").then(res=>res.json()).then(res=>this.echos.set(res))

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.load()
      }

  openModal() {
    this.showModal.set(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
  closeModal() {
    this.showModal.set(false);
    document.body.style.overflow = ''; // Re-enable scrolling
  }

  submit(){
    console.log("sa")
    if(!this.form.valid){
      alert("Invalid")
      return
    }

    
    let formdata = new FormData()
    formdata.append(
      'title', this.form.get('title')!.value
    )
    formdata.append(
      'message', this.form.get('message')!.value
    )
    formdata.append(
      'author', this.form.get('author')!.value
    )
    if(this.audioBlob()!=null){
      formdata.append("audioPresent", "true")
      formdata.append('audio', this.audioBlob()!, 'audio.wav')
    }else{
      formdata.append("audioPresent", "false")
    }
    fetch("http://127.0.0.1:5000/api/post/echo", {method:'POST',
      body: formdata
    }).then(res=>res.json()).then()
    this.closeModal()
    this.load()

  }
}
