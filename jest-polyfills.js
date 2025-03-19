import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, {
  TextEncoder,
  TextDecoder,
  Headers: class Headers {
    constructor() {
      this._headers = {};
    }
    append(key, value) {
      this._headers[key] = value;
    }
    get(key) {
      return this._headers[key];
    }
    has(key) {
      return key in this._headers;
    }
  },
  Request: class Request {
    constructor(url, options = {}) {
      this.url = url;
      this.method = options.method || 'GET';
      this.headers = new Headers();
    }
  },
  Response: class Response {
    constructor(body, options = {}) {
      this.ok = true;
      this.status = options.status || 200;
      this._body = body;
    }
    
    async json() {
      return this._body;
    }
    
    async text() {
      return JSON.stringify(this._body);
    }
  }
});
