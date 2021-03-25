import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

interface jwtObj {
  id: number;
  userRoleId: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL: string;
  JWT_KEY: string = '2102GCP_P2_jwt';

  constructor(private sharedService: SharedService, private http: HttpClient) {
    this.BASE_URL = sharedService.BASE_URL;
  }

  // Login
  async signin(email: string, pw: string): Promise<boolean> {
    try {
      const jwt: string = await this.http
        .request('POST', `${this.BASE_URL}/login`, {
          body: {
            email: email,
            password: pw,
          },
          responseType: 'text',
        })
        .toPromise();
      if (!jwt) {
        throw new Error('Unable to get jwt');
      }
      // Write JWT to localstorage.
      localStorage.setItem(this.JWT_KEY, jwt);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
    }
  }

  /************ JWT Methods *************/
  checkJWT(): boolean {
    return localStorage.get(this.JWT_KEY) !== null;
  }

  signout(): void {
    localStorage.removeItem(this.JWT_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.JWT_KEY);
  }

  getDecodeJWT(): jwtObj | null {
    const token = this.getToken();
    if (token === null) {
      return null;
    }
    return {
      id: JSON.parse(window.atob(token.split('.')[1])).id,
      userRoleId: JSON.parse(window.atob(token.split('.')[1])).userRoleId,
    };
  }

  getJwtId(): number | null {
    const token = this.getToken();
    if (token === null) {
      return null;
    }
    return JSON.parse(window.atob(token.split('.')[1])).id;
  }

  getJwtUserRoleId(): number | null {
    const token = this.getToken();
    if (token === null) {
      return null;
    }
    return JSON.parse(window.atob(token.split('.')[1])).userRoleId;
  }
}
