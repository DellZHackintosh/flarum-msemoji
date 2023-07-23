<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace webdev\msemoji;

use Flarum\Extend;
use s9e\TextFormatter\Configurator;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    (new Extend\Frontend('admin'))
       ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Formatter)
        ->configure(function (Configurator $config) {
            $config->Emoticons->add(':)', '🙂');
            $config->Emoticons->add(':D', '😃');
            $config->Emoticons->add(':P', '😛');
            $config->Emoticons->add(':(', '🙁');
            $config->Emoticons->add(':|', '😐');
            $config->Emoticons->add(';)', '😉');
            $config->Emoticons->add(':\'(', '😢');
            $config->Emoticons->add(':O', '😮');
            $config->Emoticons->add('>:(', '😡');
        }),

    (new Extend\Settings)
        ->serializeToForum('flarum-msemoji.base','flarum-msemoji.base')
        ->serializeToForum('flarum-msemoji.folder','flarum-msemoji.folder')
        ->serializeToForum('flarum-msemoji.ext','flarum-msemoji.ext')
        ->serializeToForum('flarum-msemoji.disable_autocomplete','flarum-msemoji.disable_autocomplete'),

    new Extend\Locales(__DIR__.'/locale'),
];
