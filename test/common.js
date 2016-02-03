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

/**
 * Creates a File suitable to add to FormData.
 */
var fileCounter = 0;
function createFile(fileSize, contentType) {
  var array = [];
  for (var i = 0; i < fileSize; i++) {
      array.push('A');
  }
  var file = new Blob([new Uint8Array(array)], {type: contentType});
  file.name = 'file-' + fileCounter++;
  return file;
}

/**
 * Creates an array of Files suitable to add to FormData.
 */
function createFiles(arraySize, fileSize, contentType) {
  var files = [];
  for (var i = 0; i < arraySize; i++) {
    files.push(createFile(fileSize, contentType));
  }
  return files;
}

/**
 *  Creates xhr objects configured for testing
 *
 *  @param cfg Object
 *     size: size of the request
 *     connectTime: time to sleep before notifying any progress
 *     uploadTime: time to spend
 *     stepTime: time between two progress updates
 *     serverTime: time to sleep in server after progress is 100%
 *     serverMessage: the payload sent by server.
 *     serverType: the contentType of the serverResponse.
 *     serverValidation: a function run once the file has been sent.
 */
 var xhrCreator = function(c) {
   c = c || {};
   cfg = {
     size: c.size || 100,
     connectTime: c.connectTime || 10,
     uploadTime: c.uploadTime || 10,
     stepTime: c.stepTime || 20,
     serverTime: c.serverTime || 10,
     serverMessage: c.message || '{"message": "ok"}',
     serverType: c.serverType || 'application/json',
     serverValidation: c.serverValidation || function() {}
   };
   return function() {
     var xhr = new MockHttpRequest();
     xhr.upload = {onprogress: function() {}};
     xhr.onsend = function() {
       var total = cfg.size, done = 0;
       var step = total / cfg.uploadTime * cfg.stepTime;
       function finish() {
         var error = cfg.serverValidation(xhr);
         if (error) {
           xhr.setResponseHeader('Content-Type', cfg.serverType);
           xhr.receive(500, {error: error});
         } else if (xhr.readyState < 4) {
           xhr.setResponseHeader('Content-Type', cfg.serverType);
           xhr.receive(200, cfg.serverMessage);
         }
       }
       function progress() {
         xhr.upload.onprogress({total: total, loaded: done});
         if (done < total) {
           setTimeout(progress, cfg.stepTime);
           done = Math.min(total, done + step);
         } else {
           setTimeout(finish, cfg.serverTime);
         }
       }
       function start() {
         setTimeout(progress, cfg.connectTime);
       }
       start();
     };
     return xhr;
   };
 };
