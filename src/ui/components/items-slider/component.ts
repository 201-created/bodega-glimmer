import Component from '@glimmer/component';


export default class ItemsSlider extends Component {
  didInsertElement() {
    new self.Flickity(this.element, {
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
