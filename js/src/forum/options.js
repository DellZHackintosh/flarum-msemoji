import app from 'flarum/app';

import msemoji from 'msemoji';

export const version = msemoji.version[0];

export default function (n) {
    switch (n) {
        default: case 0:
            return app.forum.attribute("flarum-msemoji.base") ?
            app.forum.attribute("flarum-msemoji.base").replace('${Version}', version) :
            msemoji.base;
            break;

        case 1:
            return app.forum.attribute("flarum-msemoji.folder");
            break;

        case 2:
            return app.forum.attribute("flarum-msemoji.ext");
    }
}