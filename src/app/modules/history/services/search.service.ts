import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly URL = environment.api;
  constructor(private httpClient: HttpClient) {}

  searchTracks$(src: string): Observable<any> {
    const params = new HttpParams().set('src', src);
    return this.httpClient.get(`${this.URL}/tracks`, { params });
  }
}
