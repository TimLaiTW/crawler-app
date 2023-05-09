import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PttPage } from './pages/ptt-page/ptt-page';
import { MaterialModule } from '../material.module';
import { DcardPage } from './pages/dcard-page/dcard-page';
import { PreviewCommentsDialog } from './components/dialogs/preview-comments-dialog/preview-comments-dialog';
import { CommentsTable } from './components/table/comments-table/comments-table';
import { LinkTable } from './components/table/link-table/link-table';
import { DcardConfigStep } from './components/steps/dcard_config_step/dcard_config_step';
import { PageHeaderSection } from './components/page_header_section/page_header_section';
import { PttConfigStep } from './components/steps/ptt_config_step/ptt_config_step';
import { ResultsStep } from './components/steps/results_step/results_step';

@NgModule({
  declarations: [
    AppComponent,
    PttPage,
    DcardPage,
    PreviewCommentsDialog,
    CommentsTable,
    LinkTable,
    DcardConfigStep,
    PageHeaderSection,
    PttConfigStep,
    ResultsStep
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
