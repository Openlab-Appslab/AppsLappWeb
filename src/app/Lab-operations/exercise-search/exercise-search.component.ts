import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Exercise } from '../exercise';
import { LabService } from '../lab.service';

@Component({
  selector: 'app-exercise-search',
  templateUrl: './exercise-search.component.html',
  styleUrls: ['./exercise-search.component.css']
})
export class ExerciseSearchComponent implements OnInit {

  exercises$: Observable<Exercise[]> ;
  private searchTerms = new Subject<string>();
  
  constructor(private labService: LabService) { }

  //push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }


  ngOnInit(): void {
 this.exercises$ = this.searchTerms.pipe(
      //wait 300ms after each keystroke before considering the term
      debounceTime(300),

      //ignore new term if same as previous term 
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
     switchMap((term: string) => this.labService.searchExercise(term)),
   );
  }

}
