import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeyBuilder } from './servey-builder';

describe('ServeyBuilder', () => {
  let component: ServeyBuilder;
  let fixture: ComponentFixture<ServeyBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServeyBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(ServeyBuilder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
