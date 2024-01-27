import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { from, fromEvent } from 'rxjs';
import { concatMap, exhaustMap, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { Course } from '../model/course';
import { Store } from '../common/store.service';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
})
export class CourseDialogComponent implements AfterViewInit {
  form: FormGroup;
  course: Course;

  @ViewChild('saveButton', { static: true, read: ElementRef })
  saveButton: ElementRef;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private store: Store
  ) {
    this.course = course;

    this.form = this.fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  ngAfterViewInit() {}

  save() {
    this.store.saveCourse(this.course.id, this.form.value).subscribe(
      () => this.close(),
      (err) => console.log('Error saving course', err)
    );
  }

  close() {
    this.dialogRef.close();
  }
}
