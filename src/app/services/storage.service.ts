import { Injectable } from '@angular/core';

const STORAGE_IDS = {
  AUTH: '__auth__',
  USER: '__user__',
};

type STORAGE_KEYS = typeof STORAGE_IDS;

@Injectable()
export class StorageService {
  public clear(key: keyof STORAGE_KEYS,) {
    localStorage.removeItem(STORAGE_IDS[key]);
  }

  public save(key: keyof STORAGE_KEYS, value: any) {
    localStorage.setItem(STORAGE_IDS[key], JSON.stringify(value));
  }

  public get(key: keyof STORAGE_KEYS): any {
    return JSON.parse(localStorage.getItem(STORAGE_IDS[key]));
  }

}
