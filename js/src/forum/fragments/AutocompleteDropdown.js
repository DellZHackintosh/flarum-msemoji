import Fragment from 'flarum/common/Fragment';

export default class AutocompleteDropdown extends Fragment {
  items = [];
  active = false;
  index = 0;
  keyWasJustPressed = false;

  view() {
    return (
      <ul className="Dropdown-menu EmojiDropdown">
        <li className="Dropdown-header">{app.translator.trans('flarum-msemoji.forum.composer.type_to_search_text')}</li>
        {this.items.map((item) => (
          <li key={item.attrs.key}>{item}</li>
        ))}
      </ul>
    );
  }

  show(left, top) {
    this.$()
      .show()
      .css({
        left: left + 'px',
        top: top + 'px',
      });
    this.active = true;
  }

  hide() {
    this.$().hide();
    this.active = false;
  }

  navigate(delta) {
    this.keyWasJustPressed = true;
    this.setIndex(this.index + delta, true);
    clearTimeout(this.keyWasJustPressedTimeout);
    this.keyWasJustPressedTimeout = setTimeout(() => (this.keyWasJustPressed = false), 500);
  }

  complete() {
    this.$('li:not(.Dropdown-header)').eq(this.index).find('button').click();
  }

  setIndex(index, scrollToItem) {
    if (this.keyWasJustPressed && !scrollToItem) return;

    const $dropdown = this.$();
    const $items = $dropdown.find('li:not(.Dropdown-header)');
    let rangedIndex = index;

    if (rangedIndex < 0) {
      rangedIndex = $items.length - 1;
    } else if (rangedIndex >= $items.length) {
      rangedIndex = 0;
    }

    this.index = rangedIndex;

    const $item = $items.removeClass('active').eq(rangedIndex).addClass('active');

    if (scrollToItem) {
      const dropdownScroll = $dropdown.scrollTop();
      const dropdownTop = $dropdown.offset().top;
      const dropdownBottom = dropdownTop + $dropdown.outerHeight();
      const itemTop = $item.offset().top;
      const itemBottom = itemTop + $item.outerHeight();

      let scrollTop;
      if (itemTop < dropdownTop) {
        scrollTop = dropdownScroll - dropdownTop + itemTop - parseInt($dropdown.css('padding-top'), 10);
      } else if (itemBottom > dropdownBottom) {
        scrollTop = dropdownScroll - dropdownBottom + itemBottom + parseInt($dropdown.css('padding-bottom'), 10);
      }

      if (typeof scrollTop !== 'undefined') {
        $dropdown.stop(true).animate({ scrollTop }, 100);
      }
    }
  }
}
