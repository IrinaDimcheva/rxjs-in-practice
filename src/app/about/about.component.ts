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
    // document.addEventListener('click', (event) => {
    //   console.log(event);

    //   setTimeout(() => {
    //     console.log('finished...');

    //     let counter = 0;
    //     setInterval(() => {
    //       console.log(counter);
    //       counter++;
    //     }, 1000);
    //   }, 3000);
    // });

    ///////////////////////////////

    // RxJs Observable
    // const interval$ = interval(1000);
    // interval$.subscribe((val) => console.log('stream 1 => ' + val));
    // interval$.subscribe((val) => console.log('stream 2 => ' + val));

    const interval$ = timer(3000, 1000);
    interval$.subscribe((val) => console.log('stream 1 => ' + val));

    const click$ = fromEvent(document, 'click');
    click$.subscribe((event) => console.log(event));
  }
}
