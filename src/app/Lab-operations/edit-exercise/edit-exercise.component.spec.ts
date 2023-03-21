import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LabService } from '../lab.service';
import { Exercise } from '../exercise';
import { EditExerciseComponent } from './edit-exercise.component';
import { FormsModule } from '@angular/forms';


describe('EditExerciseComponent', () => {
  let component: EditExerciseComponent;
  let fixture: ComponentFixture<EditExerciseComponent>;
  let mockActivatedRoute;
  let mockLabService: jasmine.SpyObj<LabService>;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('Test Ex') // Replace '1' with a valid exercise ID for your application
        }
      }
    };

    mockLabService = jasmine.createSpyObj(['editExercise']);
    mockLabService.editExercise.and.returnValue(of(new Exercise('Test Exercise', 'Test Description', 'Test Group', 5)));

    await TestBed.configureTestingModule({
      declarations: [ EditExerciseComponent ],
      imports: [FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: LabService, useValue: mockLabService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should retrieve and set the exercise from the lab service', () => {
    expect(component.exercise).toEqual(new Exercise('Test Exercise', 'Test Description', 'Test Group', 5));
  });

}); 
