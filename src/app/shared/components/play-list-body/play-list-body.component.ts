import { TrackModel } from '@core/models/tracks.model';
import { Component, OnInit, Input } from '@angular/core';
import * as dataRaw from '../../../data/track.json';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css'],
})
export class PlayListBodyComponent implements OnInit {
  @Input() tracks: TrackModel[] = [];
  optionSort: { property: string; order: string } = {
    property: '',
    order: 'asc',
  };

  constructor() {}

  ngOnInit(): void {
    const { data } = (dataRaw as any).default;
    this.tracks = data;
  }

  changeOrderTracks(property: string) {
    const { order } = this.optionSort;
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc',
    };
  }
}
