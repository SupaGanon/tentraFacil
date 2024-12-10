import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControladminPage } from './controladmin.page';

describe('ControladminPage', () => {
  let component: ControladminPage;
  let fixture: ComponentFixture<ControladminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControladminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
