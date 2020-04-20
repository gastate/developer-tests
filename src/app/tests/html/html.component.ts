import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import tests from '../../models/html.tests';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss']
})
export class HtmlComponent implements OnInit {
  test;
  content;
  location;
  @ViewChild('iframe') iframe: ElementRef;
  constructor(private route: ActivatedRoute, private htmlSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.test = this.route.snapshot.paramMap.get('type');
    this.content = this.htmlSanitizer.bypassSecurityTrustHtml(tests[this.test].content);
  }
  ngAfterViewInit() {
    this.iframe.nativeElement.addEventListener("load", () => {
      this.location = `tests/${this.test}/`;
      const css = require(`../../../../tests/${this.test}/style.css`).default;
      const html = require(`raw-loader!../../../../tests/${this.test}/body.html`).default;
      const js = require(`raw-loader!../../../../tests/${this.test}/script.js`).default;
      const doc = this.iframe.nativeElement.contentDocument;
      // ---
      doc.body.innerHTML = html;
      const style = doc.createElement('style');
      doc.head.appendChild(style);
      style.type = 'text/css';
      style.appendChild(doc.createTextNode(css));
      this.iframe.nativeElement.contentWindow.eval(js);
    });
  }
}
