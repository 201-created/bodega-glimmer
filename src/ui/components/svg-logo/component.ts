import Component, { tracked }  from '@glimmer/component';

export default class SvgLogo extends Component {
  logoVariant = 'horizontal'; // Also 'vertical' or 'badge'

  @tracked('args.logoVariant')
  get viewBox() {
    let style = this.args.logoVariant;

    switch (style) {
      case 'vertical':
        return "0 0 304 230.6";
      case 'badge':
        return "0 0 209.9 107.6";
      default: // 'horizonal'
        return "0 0 790.7 114.6";
    }
  }

  @tracked('args.logoVariant')
  get isHorizontal() { return this.args.logoVariant === 'horizontal'; }

  @tracked('args.logoVariant')
  get isVertical() { return this.args.logoVariant === 'vertical'; }

  @tracked('args.logoVariant')
  get isBadge() { return this.args.logoVariant === 'badge'; }
}
