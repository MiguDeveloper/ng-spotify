import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import * as mockRaw from '../../../data/user.json';

describe('AuthService', () => {
  let service: AuthService;
  let mockUser: any = (mockRaw as any).default;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    service = new AuthService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe retornar objeto con data y token', (done: DoneFn) => {
    // arrange
    let user = mockUser.userOk;
    const mockResponse = {
      data: {},
      token: 'neknfekfnekfnnkenfkenffnkenfkenkefnekf',
    };
    httpClientSpy.post.and.returnValue(of(mockResponse));

    // Act
    service.sendCredentials$(user.email, user.password).subscribe((resp) => {
      const properties = Object.keys(resp);
      expect(properties).toContain('data');
      expect(properties).toContain('token');
      done();
    });
  });
});
