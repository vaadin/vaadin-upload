
/**
 * Create File and file arrays suitable to add to FormData.
 */
var counter = 0;

function createFile(fileSize, contentType) {
  var array = [];
  for (var i = 0; i < fileSize; i++) {
      array.push('A');
  }
  var file = new Blob([new Uint8Array(array)], {type: contentType});
  file.name = "file-" + counter++;
  return file;
}

function createFiles(arraySize, fileSize, contentType) {
  var files = [];
  for (var i = 0; i < arraySize; i++) {
    files.push(createFile(fileSize, contentType));
  }
  return file;
}
