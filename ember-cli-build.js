'use strict';

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  let app = new GlimmerApp(defaults, {
    // Add options here
  });

  let flickity = new Funnel('node_modules/flickity/dist', {
    include: ['flickity.pkgd.min.js'],
    destDir: '/vendor'
  });

  return new MergeTrees([app.toTree(), flickity]);
};
