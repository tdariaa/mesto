export default class SectionTwo {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems (items, profileInfo) {
    items.forEach(item => {
      this._renderer(item, profileInfo);
    });

  }

  addItem(item) {
    this._container.prepend(item);
  }
}
