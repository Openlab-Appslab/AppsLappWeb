import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Lab } from '../exercise';
import { LabService } from '../lab.service';
import { DashboardComponent } from './dashboard.component';




export class LabServiceMock {
  getLabs(): Observable<Lab[]> {
    return of([{id: 1, name: 'Lab 1', labMaster: 'Martin Popper', studentNames: ['student1', 'student2'] }]);
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [{
        provide: LabService, 
        useClass: LabServiceMock,
      },
    ],
      imports: [RouterTestingModule, ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create app', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set labs', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;

    app.ngOnInit();

    expect(app.labs.length).toBe(1);
    expect(app.labs[0]).toEqual({id: 1, name: 'Lab 1', labMaster: 'Martin Popper', studentNames: ['student1', 'student2'] });
  })
});
