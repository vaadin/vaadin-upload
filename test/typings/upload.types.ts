import { UploadFile } from '../../vaadin-upload';
import '../../src/vaadin-upload';

const select = document.createElement('vaadin-upload');

const assert = <T>(value: T) => value;

select.addEventListener('max-files-reached-changed', (event) => {
  assert<boolean>(event.detail.value);
});

select.addEventListener('file-reject', (event) => {
  assert<UploadFile>(event.detail.file);
  assert<string>(event.detail.error);
});

select.addEventListener('files-changed', (event) => {
  assert<UploadFile[]>(event.detail.value);
});

select.addEventListener('upload-before', (event) => {
  assert<UploadFile>(event.detail.file);
  assert<XMLHttpRequest>(event.detail.xhr);
});

select.addEventListener('upload-start', (event) => {
  assert<UploadFile>(event.detail.file);
  assert<XMLHttpRequest>(event.detail.xhr);
});

select.addEventListener('upload-progress', (event) => {
  assert<UploadFile>(event.detail.file);
  assert<XMLHttpRequest>(event.detail.xhr);
});

select.addEventListener('upload-response', (event) => {
  assert<UploadFile>(event.detail.file);
  assert<XMLHttpRequest>(event.detail.xhr);
});

select.addEventListener('upload-success', (event) => {
  assert<UploadFile>(event.detail.file);
  assert<XMLHttpRequest>(event.detail.xhr);
});

select.addEventListener('upload-error', (event) => {
  assert<UploadFile>(event.detail.file);
  assert<XMLHttpRequest>(event.detail.xhr);
});

select.addEventListener('upload-retry', (event) => {
  assert<UploadFile>(event.detail.file);
  assert<XMLHttpRequest>(event.detail.xhr);
});

select.addEventListener('upload-abort', (event) => {
  assert<UploadFile>(event.detail.file);
  assert<XMLHttpRequest>(event.detail.xhr);
});

select.addEventListener('upload-request', (event) => {
  assert<UploadFile>(event.detail.file);
  assert<FormData>(event.detail.formData);
});
