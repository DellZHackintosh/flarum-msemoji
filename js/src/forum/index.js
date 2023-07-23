import addComposerAutocomplete from './addComposerAutocomplete';
import renderEmoji from './renderEmoji';

app.initializers.add('flarum-msemoji', () => {
  // After typing ':' in the composer, show a dropdown suggesting a bunch of
  // emoji that the user could use.
  new Promise(function (resolve) {
    var id = setInterval(function () {
      if (app.forum) {
        if (app.forum.attribute) {
          clearInterval(id);
          resolve();
        }
      }
    }, 500)
  }).then(function () {
    if (app.forum.attribute("flarum-msemoji.disable_autocomplete") != '1') addComposerAutocomplete();
  })

  // render emoji as image in Posts content and title.
  renderEmoji();
});
