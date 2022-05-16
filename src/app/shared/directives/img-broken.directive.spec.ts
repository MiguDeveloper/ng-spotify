import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken.directive';

// componente de prueba
@Component({
  template: '<img class="testing-directive" appImgBroken [src]= "srcMock">',
})
class TestComponent {
  public srcMock: any = null;
}

describe('ImgBrokenDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ImgBrokenDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const mockElemRef = new ElementRef('');
    const directive = new ImgBrokenDirective(mockElemRef);
    expect(directive).toBeTruthy();
  });

  it('TestComponent deberia estar instanciado', () => {
    expect(component).toBeTruthy();
  });

  it('Directiva deberia de cambiar imagen rota a por default', (done: DoneFn) => {
    const beforeImgElement = fixture.debugElement.query(
      By.css('.testing-directive')
    ).nativeElement;
    const beforeImgSrc = beforeImgElement.src;
    console.log('beforeeeee', beforeImgSrc);
    component.srcMock = undefined;

    setTimeout(() => {
      const afterImgElement = fixture.debugElement.query(
        By.css('.testing-directive')
      ).nativeElement;
      const afterImgSrc = afterImgElement.src;

      expect(afterImgSrc).toEqual('https://via.placeholder.com/150');
      done();
    }, 3000);
  });
});
