import pnglib from 'node-pnglib';
import {numMask} from './font';

module.exports = class captchapng {
  constructor(width, height, dispNumber) {
    this.width = width;
    this.height = height;
    this.depth = 8;
    this.dispNumber = '' + dispNumber.toString();
    this.widthAverage = parseInt(this.width / this.dispNumber.length);

    let png = new pnglib(this.width, this.height, this.depth);

    for (let section = 0; section < this.dispNumber.length; section++) {
      let dispNum = this.dispNumber[section].valueOf();
      let n = parseInt(Math.random() * numMask.length);
      n = (n >= numMask.length ? 0 : n);
      
      let random_x_offs = parseInt(Math.random() * (this.widthAverage - numMask[n][dispNum][0].length));
      let random_y_offs = parseInt(Math.random() * (this.height - numMask[n][dispNum].length));

      random_x_offs = (random_x_offs < 0 ? 0 : random_x_offs);
      random_y_offs = (random_y_offs < 0 ? 0 : random_y_offs);

      for (let i = 0; (i < numMask[n][dispNum].length) && ((i + random_y_offs) < this.height); i++) {
        let lineIndex = png.index(this.widthAverage * section + random_x_offs, i + random_y_offs);
        for (let j = 0; j < numMask[n][dispNum][i].length; j++) {
          if ((numMask[n][dispNum][i][j] == '1') && (this.widthAverage * section + random_x_offs + j) < this.width) {
            png.buffer[lineIndex + j] = 1;
          }
        }
      }
    }
    return png;
  }
};
