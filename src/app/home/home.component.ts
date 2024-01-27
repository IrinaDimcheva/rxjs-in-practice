import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { delayWhen, map, retryWhen, shareReplay, tap } from 'rxjs/operators';

import { createHttpObservable } from '../common/util';
import { Course } from '../model/course';
import { Store } from '../common/store.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  beginnersCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    const http$ = createHttpObservable('/api/courses');
    const courses$: Observable<Course[]> = http$.pipe(
      tap(() => console.log('HTTP request executed')),
      map((res) => Object.values(res['payload'])),
      shareReplay(),
      retryWhen((errors) => errors.pipe(delayWhen(() => timer(2000))))
    ) as Observable<Course[]>;

    this.beginnersCourses$ = courses$.pipe(
      map((courses: Course[]) =>
        courses.filter((course: Course) => course.category === 'BEGINNER')
      )
    );
    this.advancedCourses$ = courses$.pipe(
      map((courses: Course[]) =>
        courses.filter((course: Course) => course.category === 'ADVANCED')
      )
    );
  }
}
