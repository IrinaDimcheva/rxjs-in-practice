import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    const subject = new BehaviorSubject(0);
    const series$ = subject.asObservable();
    series$.subscribe((val) => console.log('early sub: ' + val));

    subject.next(1);
    subject.next(2);
    subject.next(3);

    // subject.complete();

    setTimeout(() => {
      series$.subscribe((val) => console.log('late sub: ' + val));

      subject.next(4);
    }, 3000);
  }
}
