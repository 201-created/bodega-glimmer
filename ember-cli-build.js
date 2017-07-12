'use strict';

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  let app = new GlimmerApp(defaults, {
    // Add options here
    'asset-cache': {
      include: [
        'assets/**/*',
        'app*.css',
        'app*.js'
      ],
      manual: [
        'vendor/flickity.pkgd.min.js'
      ],
      exclude: [
        '/',
        'index.html'
      ]
    },
    'esw-cache-fallback': {
      patterns: [
        '/',
        'https://api.shop-201.com/api/items'
      ],
      version: '3' // Changing the version will bust the cache
    },
    'ember-cli-uglify': {
      uglify: {
        mangle: {
          safari10: true
        }
      }
    },
    fingerprint: {
      generateAssetMap: true,
      exclude: ['images']
    }
  });

  let flickity = new Funnel('node_modules/flickity/dist', {
    include: ['flickity.pkgd.min.js'],
    destDir: '/vendor'
  });

  return new MergeTrees([app.toTree(), flickity]);
};
