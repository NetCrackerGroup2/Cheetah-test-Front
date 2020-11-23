import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCreateCompoundComponent } from './library-create-compound.component';

describe('LibraryCreateActionComponent', () => {
  let component: LibraryCreateCompoundComponent;
  let fixture: ComponentFixture<LibraryCreateCompoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryCreateCompoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryCreateCompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
