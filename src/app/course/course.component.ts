import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, fromEvent, Observable, concat, interval } from 'rxjs';
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
  throttle,
  throttleTime,
} from 'rxjs/operators';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { RxJsLoggingLevel, debug, setRxJsLoggingLevel } from '../common/debug';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit, AfterViewInit {
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;
  courseId: string;

  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];
    this.course$ = createHttpObservable(`/api/courses/${this.courseId}`).pipe(
      debug(RxJsLoggingLevel.INFO, 'course value ')
    ) as Observable<Course>;

    setRxJsLoggingLevel(RxJsLoggingLevel.TRACE);
  }

  ngAfterViewInit() {
    this.lessons$ = fromEvent(this.input.nativeElement, 'keyup').pipe(
      map((event: InputEvent) => (event.target as HTMLInputElement).value),
      startWith(''),
      debug(RxJsLoggingLevel.TRACE, 'search '),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search) => this.loadLessons(search)),
      debug(RxJsLoggingLevel.DEBUG, 'lessons value ')
    );
  }

  loadLessons(search = ''): Observable<Lesson[]> {
    return createHttpObservable(
      `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
    ).pipe(map((res) => res['payload']));
  }
}
