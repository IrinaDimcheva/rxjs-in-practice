import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, fromEvent, Observable, concat } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll,
  shareReplay,
} from 'rxjs/operators';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit, AfterViewInit {
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const courseId = this.route.snapshot.params['id'];

    this.course$ = createHttpObservable(
      `/api/courses/${courseId}`
    ) as Observable<Course>;
    this.lessons$ = createHttpObservable(
      `/api/lessons?courseId=${courseId}&pageSize=100`
    ).pipe(map((res) => res['payload'])) as Observable<Lesson[]>;
  }

  ngAfterViewInit() {}
}
