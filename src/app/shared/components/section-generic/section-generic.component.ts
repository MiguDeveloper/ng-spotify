import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

export type ModeSection = 'small' | 'big';

@Component({
  selector: 'app-section-generic',
  templateUrl: './section-generic.component.html',
  styleUrls: ['./section-generic.component.css'],
})
export class SectionGenericComponent implements OnInit {
  @Input() title: string = '';
  @Input() mode: ModeSection = 'big';
  @Input() dataTracks: TrackModel[] = [];

  constructor() {}

  ngOnInit(): void {}
}
