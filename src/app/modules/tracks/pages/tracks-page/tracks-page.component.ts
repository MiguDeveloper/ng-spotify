import { Subscription } from 'rxjs';
import { TrackModel } from '@core/models/tracks.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as dataRaw from '../../../../data/track.json';
import { TrackService } from '@module/tracks/services/track.service';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css'],
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksTrending: TrackModel[] = [];
  tracksRandom: TrackModel[] = [];
  subscriptions: Subscription[] = [];

  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    this.loadDataAll();
    this.loadDataRandom();
  }

  loadDataAll(): void {
    this.trackService.getAllTracks$().subscribe((data) => {
      this.tracksTrending = data;
    });
  }
  loadDataRandom(): void {
    this.trackService.getAllRandom$().subscribe((data) => {
      this.tracksRandom = data;
    });
  }

  ngOnDestroy(): void {
    //this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
