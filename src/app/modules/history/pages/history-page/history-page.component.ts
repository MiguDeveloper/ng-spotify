import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TrackModel } from '@core/models/tracks.model';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '@module/history/services/search.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent implements OnInit {
  tracksList$: Observable<any> = of([]);
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  receiveData(event: string): void {
    this.tracksList$ = this.searchService
      .searchTracks$(event)
      .pipe(map((dataRaw) => dataRaw.data));
  }
}
