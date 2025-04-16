import { Component,signal } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import {NgxRippleComponent} from "@omnedia/ngx-ripple"
import { NgxDotpatternComponent } from '@omnedia/ngx-dotpattern';
import {NgxMeteorsComponent} from "@omnedia/ngx-meteors";
import { ReactiveFormsModule } from '@angular/forms';
import { AudioRecorderComponent } from '../../components/audio-recorder/audio-recorder.component';
@Component({
  selector: 'app-voices-of-war',
  imports: [NgxRippleComponent,ReactiveFormsModule],
  templateUrl: './voices-of-war.component.html',
  styleUrl: './voices-of-war.component.css'
})
export class VoicesOfWarComponent {
  voices = signal([]);
  showModal = signal(false);
  form : FormGroup ;
  constructor (private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: [''],
      content: [''],
      author : ['']
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.load()
  }
  
  
  load(){
    fetch("http://127.0.0.1:5000/api/get/voices").then(res=>res.json()).then(res=>this.voices.set(res))
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
      'content', this.form.get('content')!.value
    )
    formdata.append(
      'author', this.form.get('author')!.value
    )
    fetch("http://127.0.0.1:5000/api/post/voice", {method:'POST',
      body: formdata
    }).then(res=>res.json()).then()
    this.closeModal()
    this.load()
    location.reload()

  }

}
