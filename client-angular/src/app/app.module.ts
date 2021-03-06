import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { SharedModule } from './shared/shared.module';
import { Environment } from './shared/environment.model';
import { environment } from '../environments/environment';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [AppComponent, ToolbarComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, SharedModule],
  providers: [{ provide: Environment, useValue: environment }],
  bootstrap: [AppComponent]
})
export class AppModule {}
