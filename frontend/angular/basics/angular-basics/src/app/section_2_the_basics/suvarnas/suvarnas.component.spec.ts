import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuvarnasComponent } from './suvarnas.component';
import { FormsModule } from '@angular/forms';
describe('SuvarnasComponent', () => {
  let component: SuvarnasComponent;
  let fixture: ComponentFixture<SuvarnasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuvarnasComponent, FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuvarnasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
