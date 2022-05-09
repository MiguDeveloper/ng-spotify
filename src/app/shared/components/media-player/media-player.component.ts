import { Component, OnDestroy, OnInit } from '@angular/core';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  constructor(private multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const subsMultimedia = this.multimediaService.callback.subscribe((track) =>
      console.log(track)
    );
    this.subscriptions.push(subsMultimedia);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subcription) => subcription.unsubscribe());
  }
}
