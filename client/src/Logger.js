/**
 * @file Stores the Logger class
 */

/**
 * Logs message to the js console and in-game "gonsole"
 * @class
 **/
var Logger = function(msg){
  this.info(msg);
};

/**
 * INFO type log
 * @method
 * @param {string} msg - Message to print
 **/
Logger.prototype.info = function(msg){
  msg = "[INFO]\t" + msg;
  console.log(msg);
  this.gonsoleLog(msg);
};

/**
 * DEBUG type log. Only shows when dev mode is active
 * @method
 * @param {string} msg - Message to print
 **/
Logger.prototype.debug = function(msg){
  if(dev){
    msg = "[DEBUG]\t" + msg;
    console.log(msg);
    this.gonsoleLog(msg);
  }
};

/**
 * WARNING type log
 * @method
 * @name warning
 * @param {string} msg - Message to print
 **/
Logger.prototype.warning = function(msg){
  msg = "[WARN]\t" + msg;
  console.log(msg);
  this.gonsoleLog(msg);
};

/**
 * WARN type log
 * @method
 * @alias warning
 * @param {string} msg - Message to print
 **/
Logger.prototype.warn = function(msg){
  msg = "[WARN]\t" + msg;
  console.log(msg);
  this.gonsoleLog(msg);
};

/**
 * ERROR type log
 * @method
 * @params {string} msg - Message to print
 **/
Logger.prototype.error = function(msg){
  msg = "[ERROR]\t" + msg;
  console.log(msg);
  this.gonsoleLog(msg);
};

/**
 * Logs to gonsole (in-game console)
 * @method
 * @params {string} msg - Message to print
 **/
Logger.prototype.gonsoleLog = function(msg){
  var gonsole = new Gonsole();
  gonsole.log(msg);
};
