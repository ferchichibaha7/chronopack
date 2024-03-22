import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountUpdateService {

  countUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  emitCountUpdate() {
    this.countUpdated.emit();
  }
}
