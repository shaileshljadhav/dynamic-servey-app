import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeyFormGrid } from './servey-form-grid';

describe('ServeyFormGrid', () => {
  let component: ServeyFormGrid;
  let fixture: ComponentFixture<ServeyFormGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServeyFormGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(ServeyFormGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
