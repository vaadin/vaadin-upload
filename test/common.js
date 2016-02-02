var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var touchDevice = (function() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
})();

var describeSkipIf = function(bool, title, callback) {
  bool = typeof bool == 'function' ? bool() : bool;
  if (bool) {
    describe.skip(title, callback);
  } else {
    describe(title, callback);
  }
};

var describeIf = function(bool, title, callback) {
  bool = typeof bool == 'function' ? bool() : bool;
  describeSkipIf(!bool, title, callback);
};

var getItemArray = function(length) {
  return new Array(length).join().split(',')
    .map(function(item, index) {
      return 'item ' + index;
    });
};

/**
 *  @param cfg Object
 *     size: size of the request
 *     connectTime: time to sleep before notifying any progress
 *     uploadTime: time to spend
 *     serverTime: time to sleep in server after progress is 100%
 */
 var xhrCreator = function(c) {
   cfg = {
     size: c.size || 100,
     connectTime: c.connectTime || 10,
     uploadTime: c.uploadTime || 10,
     serverTime: c.serverTime || 10,
   }
   return function() {
     var xhr = new MockHttpRequest();
     xhr.onsend = function() {
       var total = cfg.size, done = 0;
       var step = cfg.size / c.uploadTime / 20;
       function finish() {
         xhr.setResponseHeader("Content-Type", "application/json");
         xhr.receive(200, '{"message": "ok"}');
       }
       function progress() {
         xhr.upload.onprogress({total: total, loaded: done})
         if (done < total) {
           setTimeout(progress, 20);
           done += step;
         } else {
           setTimeout(finish, cfg.serverTime);
         }
       }
       function start() {
         setTimeout(progress, cfg.connectTime);
       }
       start();
     }
     return xhr;
   }
 }
