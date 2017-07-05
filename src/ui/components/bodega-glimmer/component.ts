import Component from '@glimmer/component';

export default class BodegaGlimmer extends Component {
  get items() {
    return [
      {
        name: 'Sticker 1',
        url: `http://lorempixel.com/400/200/abstract/sticker1`,
        price: 199
      },
      {
        name: 'Sticker 2',
        url: `http://lorempixel.com/400/200/abstract/sticker2`,
        price: 299
      }
    ];
  }

  increment() {

  }

  decrement() {
    
  }
}