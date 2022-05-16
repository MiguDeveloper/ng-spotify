import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  state: string = 'paused';
  listSubscriptions: Subscription[] = [];

  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const subsPlayerStatus = this.multimediaService.playerStatus$.subscribe(
      (status) => (this.state = status)
    );
    this.listSubscriptions.push(subsPlayerStatus);
  }

  handlePosition(event: MouseEvent) {
    const eleNative: HTMLElement = this.progressBar.nativeElement;
    const { clientX } = event;
    const { x, width } = eleNative.getBoundingClientRect();
    const clickX = clientX - x;
    const percentageFromX = (clickX / width) * 100;
    console.log(`Click(x): ${percentageFromX}`);
    this.multimediaService.seekAudio(percentageFromX);
  }

  ngOnDestroy(): void {
    this.listSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }
}
