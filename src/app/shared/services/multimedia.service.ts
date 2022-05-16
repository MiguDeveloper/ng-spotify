import { TrackModel } from '@core/models/tracks.model';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>();
  trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00');
  playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused');
  playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0);
  audio: HTMLAudioElement = new Audio();

  constructor() {
    this.trackInfo$.subscribe((track) => {
      if (track) {
        this.setAudio(track);
      }
    });

    this.listenAllEvents();
  }

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.playerStatus, false);
    this.audio.addEventListener('play', this.playerStatus, false);
    this.audio.addEventListener('pause', this.playerStatus, false);
    this.audio.addEventListener('ended', this.playerStatus, false);
  }

  seekAudio(percentage: number) {
    const { duration } = this.audio;
    const percentageToSeconds = (percentage * duration) / 100;
    console.log(percentageToSeconds);
    this.audio.currentTime = percentageToSeconds;
  }

  private setPercentage(currentTime: number, duration: number): void {
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage);
  }

  private playerStatus = (stay: any) => {
    const { type: stateAudio } = stay;
    console.log(stateAudio);

    switch (stateAudio) {
      case 'play':
        this.playerStatus$.next('play');
        break;
      case 'playing':
        this.playerStatus$.next('playing');
        break;
      case 'ended':
        this.playerStatus$.next('ended');
        break;
      default:
        this.playerStatus$.next('paused');
        break;
    }
  };

  togglePlayer(): void {
    this.audio.paused ? this.audio.play() : this.audio.pause();
  }

  private calculateTime = (): void => {
    const { duration, currentTime } = this.audio;

    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(currentTime, duration);
    this.setPercentage(currentTime, duration);
  };

  private setTimeElapsed(currentTime: number): void {
    const timeElapsed = this.getTimeFormatMinutesAndSecond(currentTime);
    const displayFormat = `${timeElapsed}`;

    this.timeElapsed$.next(displayFormat);
  }

  private setTimeRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;
    const timeRemaining = this.getTimeFormatMinutesAndSecond(timeLeft);
    const displayFormat = `-${timeRemaining}`;

    this.timeRemaining$.next(displayFormat);
  }

  private getTimeFormatMinutesAndSecond(currenTime: number): string {
    let seconds = Math.floor(currenTime % 60);
    let minutes = Math.floor((currenTime / 60) % 60);

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinutes}:${displaySeconds}`;
    return displayFormat;
  }

  setAudio(track: TrackModel) {
    console.log(track);
    this.audio.src = track.url;
    this.audio.play();
  }
}
