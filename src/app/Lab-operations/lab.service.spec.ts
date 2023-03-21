import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LabService } from './lab.service';

describe('LabService', () => {
  let service: LabService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ LabService, { provide: Router, useValue: {} }, { provide: MatDialog, useValue: {} },]
    });
    service = TestBed.inject(LabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
