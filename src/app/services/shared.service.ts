// NOTE: Shared Service must be instantiated first since it is used
// as a dependency injection into other services.
// This can be done by specifying it as a provider in app.module.ts.

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  BASE_URL: string = 'http://localhost:8080';

  constructor() {}
}
