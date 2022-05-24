import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AutoCharImageService } from './auto-char-image.service';
import { AutoCharImage } from './interfaces';

@Component({
  selector: 'app-auto-char-image',
  templateUrl: './auto-char-image.component.html',
  styleUrls: ['./auto-char-image.component.scss'],
})
export class AutoCharImageComponent implements OnInit, OnChanges {
  @Input() pseudoName = 'WK';

  autoCharImage: AutoCharImage = {
    pseudoName: 'WK',
    rgbColor: 'rgb(2,103,255)',
  };

  constructor(private autoCharImageService: AutoCharImageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pseudoName']) {
      const rgbColor = this.autoCharImageService.getRgbColor(this.pseudoName);

      this.autoCharImage.pseudoName = this.pseudoName;
      this.autoCharImage.rgbColor = rgbColor;
    }
  }

  ngOnInit(): void {}
}
