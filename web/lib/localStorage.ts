import './imageupload';

class LocalStorage implements Storage {
  [key: string]: any;
  [index: number]: string;

  data: {
    [key: string]: string;
  };

  constructor() {
    this.clear();
  }

  get length(): number {
    return Object.keys(this.data).length;
  }

  clear() {
    this.data = {};
  }

  getItem(key: string): string | null {
    return key in this.data ? this.data[key] : null;
  }

  removeItem(key: string): void {
    delete this.data[key];
  }

  setItem(key: string, data: string): void {
    this.data[key] = data;
  }

  key(index: number): string | null {
    return index >= 0 && index < this.length
      ? Object.keys(this.data)[index]
      : null;
  }
}

const TEST_KEY = '_test';

let storage: Storage;

try {
  window.localStorage.setItem(TEST_KEY, TEST_KEY);
  window.localStorage.removeItem(TEST_KEY);
  storage = window.localStorage;
} catch (e) {
  storage = new LocalStorage();
}

export default storage;