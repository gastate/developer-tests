import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ObservableComponent } from './tests/observable/observable.component';
import { FunctionsComponent } from './tests/functions/functions.component';
import { HtmlComponent } from './tests/html/html.component';


const routes: Routes = [{
  path: "functions/:type",
  component: FunctionsComponent,
}, {
  path: "html/:type",
  component: HtmlComponent
}, {
  path: "observable",
  component: ObservableComponent,
},
{
  path: '',
  component: HomeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
