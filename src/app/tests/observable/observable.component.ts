import { Component, OnInit } from '@angular/core';
import { Subject, observable } from 'rxjs';
import { Throttle, Combine } from 'tests/observable';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit {
  throttleValue: number = 50;
  combineValue: string = '';
  constructor() { }

  ngOnInit(): void {
    this.testThrottle();
    this.testCombine();

  }

  testThrottle() {
    const subject: Subject<void> = new Subject<void>();
    const observable = Throttle(subject);
    setInterval(() => subject.next(), 1000);

    setInterval(() => {
      this.throttleValue--
      this.throttleValue = Math.max(this.throttleValue, 0);
    }, 5000);

    observable.subscribe(() => {
      this.throttleValue++;
      this.throttleValue = Math.min(this.throttleValue, 100);
    })
  }

  testCombine() {
    const subjects: [SS, SS, SS, SS, SS] = [new Subject(), new Subject(), new Subject(), new Subject(), new Subject()];
    const observable = Combine(...subjects);
    const s = 'Hello World\n';
    let i = -1;
    setInterval(() => {
      if (++i >= s.length)
        i = 0;
      subjects[Math.floor(Math.random() * 5)].next(s[i]);
    }, 500);

    observable.subscribe(v => {
      if (i == 0)
        this.combineValue = '';
      this.combineValue += v;
    })
  }
}
type SS = Subject<string>;