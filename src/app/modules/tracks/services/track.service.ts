import { TrackModel } from '@core/models/tracks.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) {}

  getAllTracks$(): Observable<any> {
    return this.httpClient
      .get(`${this.URL}/tracks`)
      .pipe(map(({ data }: any) => data));
  }

  getAllRandom$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      mergeMap(({ data }: any) => this.skipById(data, 1)),
      catchError((err) => {
        return of([]);
      })
    );
  }

  private skipById(tracks: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const tmpTracks = tracks.filter((track: TrackModel) => track._id !== id);
      resolve(tmpTracks);
    });
  }
}
