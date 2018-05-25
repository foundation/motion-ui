Package.describe({
  name: 'zurb:motion-ui',
  version: '2.0.0',
  summary: 'Sass library for creating transitions and animations',
  git: 'https://github.com/zurb/motion-ui.git',
  documentation: 'meteor-README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.imply('fourseven:scss@3.4.1');
  api.use(['ecmascript', 'jquery', 'fourseven:scss@3.4.1'], 'client');
  api.addFiles('dist/motion-ui.js', 'client');
  api.addFiles([
    'src/_settings.scss',
    'src/util/_animation.scss',
    'src/util/_args.scss',
    'src/util/_keyframe.scss',
    'src/util/_selector.scss',
    'src/util/_series.scss',
    'src/util/_transition.scss',
    'src/util/_unit.scss',
    'src/effects/_fade.scss',
    'src/effects/_hinge.scss',
    'src/effects/_spin.scss',
    'src/effects/_zoom.scss',
    'src/effects/_shake.scss',
    'src/effects/_slide.scss',
    'src/effects/_wiggle.scss',
    'src/transitions/_fade.scss',
    'src/transitions/_hinge.scss',
    'src/transitions/_zoom.scss',
    'src/transitions/_slide.scss',
    'src/transitions/_spin.scss',
    'src/_classes.scss',
    'src/motion-ui.scss'
  ], 'client', {isImport: true});
});
