import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutoCharImageService {
  constructor() {}

  getRgbColor(pseudoName: string): string {
    const charCodeRed = pseudoName.charCodeAt(0);
    const charCodeGreen = pseudoName.charCodeAt(1) || charCodeRed;

    const red = Math.pow(charCodeRed, 7) % 200;
    const green = Math.pow(charCodeGreen, 7) % 200;
    const blue = (red + green) % 200;

    return `rgb(${red},${green},${blue})`;
  }
}
