import { OrderListPipe } from './order-list.pipe';
import * as dataRaw from '../../data/track.json';
import { TrackModel } from '@core/models/tracks.model';

describe('OrderListPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderListPipe();
    expect(pipe).toBeTruthy();
  });

  it('Probado entrada y salida de valores', () => {
    // Arrange
    const pipe = new OrderListPipe();
    const { data } = (dataRaw as any).default;

    // Act
    const result: TrackModel[] = pipe.transform(data);

    // Assert
    expect(result).toEqual(data);
  });

  it('Probar si ordena de manera asc', () => {
    // arrange
    const pipe = new OrderListPipe();
    const { data } = (dataRaw as any).default;
    const firstTrack = data.find((track: any) => track._id === 7);
    const lastTrack = data.find((track: any) => track._id === 6);

    // act
    const result = pipe.transform(data, 'name', 'asc');
    const trackFirstResult = result[0];
    const trackLastResult = result[result.length - 1];

    // assert
    expect(firstTrack).toEqual(trackFirstResult);
    expect(lastTrack).toEqual(trackLastResult);
  });

  it('Probar si ordena de manera desc', () => {
    // arrange
    const pipe = new OrderListPipe();
    const { data } = (dataRaw as any).default;
    const firstTrack = data.find((track: any) => track._id === 7);
    const lastTrack = data.find((track: any) => track._id === 6);

    // act
    const result = pipe.transform(data, 'name', 'desc');
    const trackFirstResult = result[0];
    const trackLastResult = result[result.length - 1];

    // assert
    expect(firstTrack).toEqual(trackLastResult);
    expect(lastTrack).toEqual(trackFirstResult);
  });
});
