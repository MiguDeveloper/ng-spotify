import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { AuthService } from '@module/auth/services/auth.service';
import { By } from '@angular/platform-browser';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia retornar invalid formulario', () => {
    // Arrange
    const mockCredentials = {
      email: 'dkendke',
      password: 'kenknkdkndkendekndekdnekn',
    };
    const emailForm = component.formLogin.get('email');
    const passwordForm = component.formLogin.get('password');

    // Act
    emailForm?.setValue(mockCredentials.email);
    passwordForm?.setValue(mockCredentials.password);

    // Assert
    expect(component.formLogin.invalid).toBeTruthy();
  });

  it('Deberia retornar valid formulario', () => {
    // Arrange
    const mockCredentials = {
      email: 'dkendke@gmail.com',
      password: 'kenkn123',
    };
    const emailForm = component.formLogin.get('email');
    const passwordForm = component.formLogin.get('password');

    // Act
    emailForm?.setValue(mockCredentials.email);
    passwordForm?.setValue(mockCredentials.password);

    // Assert
    expect(component.formLogin.invalid).toBeFalsy();
  });

  it('El boton submit deberia tener la palabra iniciar sesion', () => {
    const elementRef = fixture.debugElement.query(
      By.css('.form-action button')
    );
    const getInnerText = elementRef.nativeElement.innerText;
    expect(getInnerText).toEqual('Iniciar sesión');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
