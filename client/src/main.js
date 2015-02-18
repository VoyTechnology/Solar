/**
 * @file This file initializes the document wide variables. Calls the init() function when the window is done loading
 */


// Include configuration files
var package = require('../package.json'),
    config = require('../config.json'),
    gui = require('nw.gui');

// Define all document scope variables
var dev = config.devmode;

var settings, log, gonsole;
var scene, camera, renderer;

var clock, controls;

var connection;

var me, players;

// Test variables
var isRendering;

// Wait for the entire page to load to start rendering
$(window).load( function(){
  init();
});
