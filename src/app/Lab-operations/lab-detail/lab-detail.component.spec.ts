import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { LabService } from '../lab.service';
import { RouterModule } from '@angular/router';

import { Exercise } from '../exercise';
import { ExerciseGroup } from '../exercise-group';
import { LabDetailComponent } from './lab-detail.component';

describe('LabDetailComponent', () => {
  let component: LabDetailComponent;
  let fixture: ComponentFixture<LabDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabDetailComponent ],
      providers: [LabService],
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule, RouterModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return red color if deadline is within 2 days', () => {
    const exercise = new Exercise('exercise1', 'desc', 'group1', 2);
    const group = new ExerciseGroup('group1', [exercise]);
    group.deadline = new Date('2023-03-26');
    const color = component.getBackgroundColor(group);
    expect(color).toEqual('red');
  });

  it('should return orange color if deadline is within 15 days', () => {
    const exercise = new Exercise('exercise1', 'desc', 'group1', 2);
    const group = new ExerciseGroup('group1', [exercise]);
    group.deadline = new Date('2023-04-09');
    const color = component.getBackgroundColor(group);
    expect(color).toEqual('#FFA500');
  });

  it('should return green color if deadline is more than 15 days away', () => {
    const exercise = new Exercise('exercise1', 'desc', 'group1', 2);
    const group = new ExerciseGroup('group1', [exercise]);
    group.deadline = new Date('2023-04-16');
    const color = component.getBackgroundColor(group);
    expect(color).toEqual('#32CD32');
  });
});
