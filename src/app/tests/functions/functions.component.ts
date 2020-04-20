import { Component, OnInit } from '@angular/core';
import functionAnswers from '../../models/functions.answers';
import functionSamples from '../../models/functions.samples';
import functionTests from '../../models/functions.tests';
import * as arrayTests from 'tests/array';
import * as promiseTests from 'tests/promise';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
const functionTypes = {
  'array': arrayTests,
  'promise': promiseTests
}
@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.scss']
})
export class FunctionsComponent implements OnInit {
  results;
  test;
  constructor(private route: ActivatedRoute, private htmlSanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    this.test = this.route.snapshot.paramMap.get('type');
    const samples = functionSamples[this.test];
    const answers = functionAnswers[this.test];
    const tests = functionTests[this.test];
    const functions = functionTypes[this.test];
    const results = [];
    const p = [];
    for (const fn in tests) {
      let result = {
        function: fn,
        description: this.htmlSanitizer.bypassSecurityTrustHtml(tests[fn]),
        samples: [],
        pass: true
      };
      const f = functions[fn];
      for (let i = 0; i < samples[fn].length; i++) {
        const sample = JSON.parse(JSON.stringify(samples[fn][i]));
        const answer = answers[fn][i];
        const diff = this.valueDiff(answer, f(sample));
        result.samples.push(diff);
        p.push(diff);
      }
      results.push(result);

    }
    await Promise.all(p);
    for (const fn in results) {
      results[fn].samples = await Promise.all(results[fn].samples);
      for (let index = 0; index < results[fn].samples.length; index++) {
        results[fn].samples[index].label = `Sample #${index + 1}`;
        results[fn].pass = results[fn].pass && results[fn].samples[index].pass;
      }
    }
    this.results = results;
  }

  arrayDiff(answers, provided) {
    answers = Array.isArray(answers) ? answers : [];
    provided = Array.isArray(provided) ? provided : [];
    const length = Math.max(answers.length, provided.length);
    const compare = [];
    let pass = true;
    for (let index = 0; index < length; index++) {
      const result = {
        answer: answers[index],
        provided: provided[index],
        pass: this.valueEqual(answers[index], provided[index])
      }
      pass = result.pass && pass;
      compare.push(result);
    }
    return { type: 'array', compare, pass };
  }

  objectDiff(answers, provided) {
    const compare = {}
    for (const key in answers) {
      compare[key] = true;
    }
    for (const key in provided) {
      compare[key] = true;
    }
    let pass = true;

    for (const key in compare) {
      compare[key] = {
        answer: answers[key],
        provided: provided[key],
        pass: this.valueEqual(answers[key], provided[key])
      }
      pass = compare[key].pass && pass;
    }
    return { type: 'object', compare, pass };
  }

  async valueDiff(answers, provided) {

    if (typeof answers != typeof provided)
      return {
        type: 'primitive',
        answer: answers,
        provided: provided,
        pass: false
      }

    answers = await this.resolvePromise(answers);
    provided = await this.resolvePromise(provided);
    const answersIsArray = Array.isArray(answers);
    const providedIsArray = Array.isArray(provided);
    if (answersIsArray != providedIsArray)
      return {
        type: 'primitive',
        answer: answers,
        provided: provided,
        pass: false
      };
    if (answersIsArray)
      return this.arrayDiff(answers, provided)

    if (typeof answers == 'object')
      return this.objectDiff(answers, provided);

    return {
      type: 'primitive',
      answer: answers,
      provided: provided,
      pass: this.valueEqual(answers, provided)
    }
  }

  arrayEqual(answers, provided) {
    if (answers.length != provided.length)
      return false;
    for (let index = 0; index < answers.length; index++) {
      if (!this.valueEqual(answers[index], provided[index]))
        return false;
    }
    return true;
  }

  objectEqual(answers, provided) {
    try {
      if (!answers || !provided)
        return false;
      const keys = {}
      for (const key in answers) {
        keys[key] = true;
      }
      for (const key in provided) {
        keys[key] = true;
      }
      for (const key in keys) {
        if (!this.valueEqual(answers[key], provided[key]))
          return false;
      }
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }
  valueEqual(answers, provided) {
    if (typeof answers != typeof provided)
      return false
    const answersIsArray = Array.isArray(answers);
    const providedIsArray = Array.isArray(provided);
    if (answersIsArray != providedIsArray)
      return false;
    if (answersIsArray)
      return this.arrayEqual(answers, provided)

    if (typeof answers == 'object')
      return this.objectEqual(answers, provided);

    return answers === provided;
  }

  async resolvePromise(value) {
    try {
      return await value;
    } catch (error) {
      const e = new Error(error);
      return e;
    }
  }
}
