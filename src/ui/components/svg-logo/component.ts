import Component, { tracked }  from '@glimmer/component';

export default class SvgLogo extends Component {
  @tracked('args')
  get logoVariant() {
   return this.args.logoVariant || 'horizontal'; // Also 'vertical' or 'badge'
  }

  @tracked('logoVariant')
  get viewBox() {
    let style = this.logoVariant;

    switch (style) {
      case 'vertical':
        return "0 0 304 230.6";
      case 'badge':
        return "0 0 209.9 107.6";
      default: // 'horizonal'
        return "0 0 790.7 114.6";
    }
  }

  @tracked('logoVariant')
  get isHorizontal() { return this.logoVariant === 'horizontal'; }

  @tracked('logoVariant')
  get isVertical() { return this.logoVariant === 'vertical'; }

  @tracked('logoVariant')
  get isBadge() { return this.logoVariant === 'badge'; }
}
