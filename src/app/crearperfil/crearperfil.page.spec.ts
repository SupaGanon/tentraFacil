import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearperfilPage } from './crearperfil.page';

describe('CrearperfilPage', () => {
  let component: CrearperfilPage;
  let fixture: ComponentFixture<CrearperfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
