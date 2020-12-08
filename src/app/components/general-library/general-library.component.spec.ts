import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GeneralLibraryComponent} from './general-library.component';

describe('GeneralLibraryComponent', () => {
  let component: GeneralLibraryComponent;
  let fixture: ComponentFixture<GeneralLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
