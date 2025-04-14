import { Component,signal,Signal,input, WritableSignal, model } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-audio-recorder',
  standalone:true,
  imports: [],
  templateUrl: './audio-recorder.component.html',
  styleUrl: './audio-recorder.component.css'
})
export class AudioRecorderComponent {
  
  isRecording  = signal(false);
  isPlaying= signal(false);
  audioBlobUrl = signal('');
  record : any;
  audioBlob= model()
  


  constructor(private domSanitizer: DomSanitizer) {}
  sanitize(url: string) {
  return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  toggle(){
    if(this.isRecording()){
      this.stopRecording();
    }else{
      this.startRecording();
    }
  }

  startRecording(){
    this.isRecording.set(true);
    this.audioBlobUrl.set("");
    let mediaConstraints = {
      video: false,
      audio: true,
      
    };
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), );
    
  }

  successCallback(stream:any ) {
    var options :RecordRTC.Options = {
    mimeType: "audio/wav",
    numberOfAudioChannels: 1,
    //sampleRate: 44100,
    recorderType: RecordRTC.StereoAudioRecorder
    };
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording(){
    
    this.isRecording.set(false);
    this.record.stop(this.processRecording.bind(this));
  }
  
  processRecording(blob:Blob){
    this.audioBlob.set(blob)
    this.audioBlobUrl.set(URL.createObjectURL(blob))
    console.log(this.audioBlobUrl)

  }

  deleteRecording(){
    this.isRecording.set(false);
    this.audioBlobUrl.set("");
    this.audioBlob.set(null)

  }

}
