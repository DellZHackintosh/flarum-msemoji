import msemoji from 'msemoji';

import { override } from 'flarum/common/extend';
import Post from 'flarum/common/models/Post';

import getoption from './options';

/**
 * Parses an HTML string into a `<body>` node containing the HTML content.
 *
 * Vanilla JS implementation of jQuery's `$.parseHTML()`,
 * sourced from http://youmightnotneedjquery.com/
 */
function parseHTML(str) {
  const tmp = document.implementation.createHTMLDocument();
  tmp.body.innerHTML = str;
  return tmp.body;
}

export default function renderEmoji() {
  override(Post.prototype, 'contentHtml', function (original) {
    const contentHtml = original();

    if (this.oldContentHtml !== contentHtml) {
      // We need to parse the HTML string into a DOM node, then give it to Twemoji.
      //
      // This prevents some issues with the default find-replace that would be performed
      // on a string passed to `Twemoji.parse()`.
      //
      // The parse function can only handle a single DOM node provided, so we need to
      // wrap it in a node. In our `parseHTML` implementation, we wrap it in a `<body>`
      // element. This gets stripped below.
      //
      // See https://github.com/flarum/core/issues/2958
      const emojifiedDom = msemoji.parse(parseHTML(contentHtml), {
        base: getoption(),
        folder: getoption(1),
        ext: getoption(2),
        attributes: () => ({
          loading: 'lazy',
        }),
      });

      // Steal the HTML string inside the emojified DOM `<body>` tag.
      this.emojifiedContentHtml = emojifiedDom.innerHTML;

      this.oldContentHtml = contentHtml;
    }

    return this.emojifiedContentHtml;
  });

  override(s9e.TextFormatter, 'preview', (original, text, element) => {
    original(text, element);

    msemoji.parse(element, {
      base: getoption(),
      folder: getoption(1),
      ext: getoption(2),
      attributes: () => ({
        loading: 'lazy',
      }),
    });
  });
}