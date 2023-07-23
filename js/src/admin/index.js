import app from 'flarum/app';

app.initializers.add('DaleZ-msemoji', () => {
    app.extensionData.for('DaleZ-msemoji')
    .registerSetting(
        {
            setting: 'flarum-msemoji.base',
            label: app.translator.trans('flarum-msemoji.admin.settings.base'),
            type: 'text',
            help: app.translator.trans('flarum-msemoji.admin.settings.basehelp')[0].replace('$', "'${Version}'"),
            placeholder: app.translator.trans('flarum-msemoji.admin.settings.baseph')
        }
    )
    .registerSetting(
        {
            setting: 'flarum-msemoji.folder',
            label: app.translator.trans('flarum-msemoji.admin.settings.folder'),
            type: 'text',
            placeholder: app.translator.trans('flarum-msemoji.admin.settings.folderph')
        }
    )
    .registerSetting(
        {
            setting: 'flarum-msemoji.ext',
            label: app.translator.trans('flarum-msemoji.admin.settings.ext'),
            type: 'text',
            placeholder: app.translator.trans('flarum-msemoji.admin.settings.extph')
        }
    )
    .registerSetting(
        {
            setting: 'flarum-msemoji.disable_autocomplete',
            label: app.translator.trans('flarum-msemoji.admin.settings.disable_autocomplete'),
            type: 'switch',
        }
    )
})