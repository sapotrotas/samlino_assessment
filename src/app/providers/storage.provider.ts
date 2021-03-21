import { Injectable } from '@angular/core';

// Interfaces
import { log, logTypes } from 'src/app/interfaces/log.interface';

function itsANumber(value: any) {
  return /^\d+$/.test(value);
}

@Injectable({
  providedIn: 'root',
})
export class StorageProvider {
  constructor() {}

  getItem(name: string): any {
    let item = window.localStorage.getItem(name);

    if (itsANumber(item)) {
      return item;
    }

    try {
      return JSON.parse(item);
    } catch(e) {
      return item;
    }
  }

  async setItem(name: string, obj: any) {
    if (typeof obj !== 'object') {
      window.localStorage.setItem(name, obj);
      return;
    }

    let item: any = this.getItem(name);
    let newItem: { [index: string]: any } = {};

    if (!item) {
      let newObj: { [index: string]: any } = obj;

      try {
        for (let key in newObj) {
          if (
            newObj[key] ||
            newObj[key] === 0 ||
            newObj[key] === false ||
            newObj[key] === ''
          ) {
            if (key.charAt(0) === '_') {
              newItem[key.substr(1)] = newObj[key];
            } else {
              newItem[key] = newObj[key];
            }
          }
        }
      } catch (e) {
        log(this, e, logTypes.ERROR);
        throw e;
      }
    } else {
      let oldItem: { [index: string]: any } = item;
      let newObj: { [index: string]: any } = obj;

      try {
        // Add old to new
        for (let key in oldItem) {
          newItem[key] = oldItem[key];
        }

        // Add new to new
        for (let key in newObj) {
          if (
            newObj[key] ||
            newObj[key] === 0 ||
            newObj[key] === false ||
            newObj[key] === ''
          ) {
            if (key.charAt(0) === '_') {
              newItem[key.substr(1)] = newObj[key];
            } else {
              newItem[key] = newObj[key];
            }
          }
        }
      } catch (e) {
        log(this, e, logTypes.ERROR);
        throw e;
      }
    }

    if (!this.isEmpty(newItem)) {
      window.localStorage.setItem(name, JSON.stringify(newItem));
      return
    } else {
      throw new Error('Item is empty');
    }
  }

  async updateItem(name: string, obj: any) {
    this.removeItem(name);
    return this.setItem(name, obj);
  }

  pushItem(containerName: string, name: string, obj: any): Promise<any> {
    let item: { [index: string]: any } = this.getItem(name);

    if (!item) {
      let array: Array<any> = Array<any>();
      let container: { [index: string]: any } = {};
      array.push(obj);
      container[containerName] = array;
      return this.setItem(name, container);
    } else {
      try {
        item[containerName].push(obj);
      } catch (e) {
        return new Promise((_, reject) => reject(e));
      }
      return this.updateItem(name, item);
    }
  }

  removeItem(item: string) {
    window.localStorage.removeItem(item);
  }

  isEmpty(obj: any) {
    return obj === {};
  }
}
