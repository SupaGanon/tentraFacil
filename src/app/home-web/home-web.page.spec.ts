import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeWebPage } from './home-web.page';

describe('HomeWebPage', () => {
  let component: HomeWebPage;
  let fixture: ComponentFixture<HomeWebPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeWebPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
