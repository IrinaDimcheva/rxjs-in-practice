import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, interval, timer } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // const interval$ = interval(1000);
    // interval$.subscribe((val) => console.log('stream 1 => ' + val));
    // interval$.subscribe((val) => console.log('stream 2 => ' + val));

    const interval$ = timer(3000, 1000);
    const subscription = interval$.subscribe((val) =>
      console.log('stream 1 => ' + val)
    );

    setTimeout(() => subscription.unsubscribe(), 5000);

    const click$ = fromEvent(document, 'click');
    click$.subscribe(
      (event) => console.log(event),
      (err) => console.log(err),
      () => console.log('completed')
    );
  }
}
