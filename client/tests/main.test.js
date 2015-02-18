var assert = require('assert');

function is(a, b){
  b = b || true;
  return (a === b) ? "pass\t" : "fail\t";
}

function ins(a, b){
  return (a instanceof b) ? "pass\t" : "fail\t";
}

function existsInDOM(doc){
  return ($(doc).length > 0) ? "pass\t" : "fail\t";
}

function test(){

  tprint( ins(gonsole, Gonsole) +   "gonsole instance of Gonsole:" );
  tprint( ins(log, Logger) +        "log instance of Logger:" );
  tprint( ins(settings, Settings) + "settings instance of Settings:" );
  tprint( is(isRendering) +         "Render loop started:");
  tprint( existsInDOM('canvas')+    "Canvas exists:");

  log.info("INFO test");
  log.debug("DEBUG test");
  log.warning("WARNING test");
  log.warn("WARN test");
  log.error("ERROR test");

}

function tprint(msg){
  console.log("[TEST]\t"+msg);
  gonsole.log("[TEST]\t"+msg);
}
