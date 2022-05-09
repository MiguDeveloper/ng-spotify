import { TrackModel } from '@core/models/tracks.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderList',
})
export class OrderListPipe implements PipeTransform {
  transform(tracks: any[], ...args: string[]): TrackModel[] {
    try {
      if (!args.length) {
        return tracks;
      }
      
      const [orderBy = '', ascOrDesc = 'asc'] = args;
      const tmpTracks = tracks.sort((a, b) => {
        if (a[orderBy] < b[orderBy]) {
          return -1;
        } else if (a[orderBy] === b[orderBy]) {
          return 0;
        } else if (a[orderBy] > b[orderBy]) {
          return 1;
        }
        return 1;
      });
      return ascOrDesc === 'asc' ? tmpTracks : tmpTracks.reverse();
    } catch (error) {
      console.log('Algo paso');
      return tracks;
    }
  }
}
