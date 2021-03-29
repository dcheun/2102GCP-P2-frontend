// NOTE: Shared Service must be instantiated first since it is used
// as a dependency injection into other services.
// This can be done by specifying it as a provider in app.module.ts.

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  BASE_URL: string = 'http://javalin-1.duckdns.org:8080';

  constructor() {}

  /**
   * Returns a random integer between start (inclusive) and end (inclusive).
   */
  genRandomInt(start: number, end: number): number {
    start = Math.ceil(start);
    end = Math.floor(end);
    return Math.floor(Math.random() * (end - start + 1)) + start;
  }
}
