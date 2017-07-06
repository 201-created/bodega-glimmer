import Component from '@glimmer/component';

export default class ItemsSlider extends Component {
  _flickity = null;
  _flickityScheduled = false;

  flickity() {
    if (!this._flickityScheduled) {
      Promise.resolve().then(() => {
        this._flickityScheduled = false;
        this._restartFlickity();
      });
    }
    this._flickityScheduled = true;
  }

  _restartFlickity() {
    if (this._flickity) {
      this._flickity.destroy();
    }
    this._flickity = new self.Flickity(this.element, {
      contain: true,
      cellSelector: '.item',
      setGallerySize: false,
      arrowShape: {
        x0: 10,
        x1: 45, y1: 50,
        x2: 65, y2: 50,
        x3: 30
      }
    });
  }
}
