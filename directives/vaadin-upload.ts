import {
  Injector,
  Directive,
  ElementRef,
  Output,
  HostListener,
  EventEmitter,
  Provider,
  forwardRef,
  Renderer
} from 'angular2/core';
import { NgControl, NG_VALUE_ACCESSOR, DefaultValueAccessor } from 'angular2/common';
import { CONST_EXPR } from 'angular2/src/facade/lang';
declare var Polymer;

const VAADIN_UPLOAD_CONTROL_VALUE_ACCESSOR = CONST_EXPR(new Provider(
    NG_VALUE_ACCESSOR, {
      useExisting: forwardRef(() => VaadinUpload),
      multi: true
    }));

@Directive({
  selector: 'vaadin-upload',
  providers: [VAADIN_UPLOAD_CONTROL_VALUE_ACCESSOR]
})
export class VaadinUpload extends DefaultValueAccessor {

  private _element;
  private _initialValueSet = false;

  @Output() filesChange: EventEmitter<any> = new EventEmitter(false);
  @HostListener('files-changed')
  fileschanged() {
    if (!this._initialValueSet) {
      // Do not trigger onChange when the initial (empty) value is set
      // to keep the field as "pristine".
      this._initialValueSet = true;
      return;
    }

    const value = this._element.files;
    this.filesChange.emit(value);
    this.onChange(value);
  }

  constructor(renderer: Renderer, el: ElementRef,  private _injector: Injector) {
    super(renderer, el);

    if (!(<any>window).Polymer || !Polymer.isInstance(el.nativeElement)) {
      console.error("vaadin-upload has not been imported yet, please remember to import vaadin-upload.html in your main HTML page.");
      return;
    }

    this._element = el.nativeElement;
    this._element.$$('paper-button').addEventListener('blur', () => {
      this.onTouched();
    });

    this._element.async(this._observeMutations.bind(this));
  }

  _observeMutations() {
    const lightDom = Polymer.dom(this._element);
    const addedId = '_vaadin_upload_light_child';
    const removableId = '_vaadin_upload_light_child_removable';

    // Move all the misplaced nodes to light dom
    [].forEach.call([].slice.call(this._element.childNodes, 0), (child) => {
      if (this._isLightDomChild(child) && child.parentElement === this._element) {
        Polymer.dom(this._element).appendChild(child);
        child[removableId] = child[addedId] = true;
      }
    });

    // Add a mutation observer for further additions / removals
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {

        [].forEach.call(mutation.addedNodes, (added) => {
          if (this._isLightDomChild(added) && !added[addedId] && added.parentElement === this._element) {
            lightDom.appendChild(added);
            added[addedId] = true;
            setTimeout(() => {
              added[removableId] = true;
            }, 0);
          }
        });

        [].forEach.call(mutation.removedNodes, (removed) => {
          if (this._isLightDomChild(removed) && removed[addedId] && removed[removableId]) {
            lightDom.removeChild(removed);
            setTimeout(() => {
              removed[removableId] = removed[addedId] = false;
            }, 0);
          }
        });
      });
    }).observe(this._element, { childList: true, subtree: true});
  }

  _isLightDomChild(node) {
    return !node.tagName || !node.classList.contains('vaadin-upload');
  }

}
