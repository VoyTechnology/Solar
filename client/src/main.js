/**
 * @file This file initializes the document wide variables. Calls the init() function when the window is done loading
 */


// Include configuration files
var package = require('../package.json'),
    config = require('../config.json'),
    gui = require('nw.gui');

// Define all document scope variables
/** @global */
var dev = config.devmode;

/** @global */
var settings, log, gonsole;
/** @global */
var scene, camera, renderer;

/** @global */
var clock, controls;

/** @global */
var connection;

/** @global */
var player;

/** @global */
var players = [];

/** @global */
var planets = [];

/** @global */
var models = [];

// Test variables
var isRendering;

// Wait for the entire page to load to start rendering
$(window).load( function(){
  init();
});
