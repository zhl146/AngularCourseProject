import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ImageFallbackDirective } from './image-fallback.directive';

@NgModule({
  declarations: [
    ImageFallbackDirective
  ],
  imports: [
    // layout grid
    FlexLayoutModule,

    // material design
    MdToolbarModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdListModule,
    MdIconModule,
    MdCheckboxModule,
    MdTabsModule,
    MdSnackBarModule,
    MdDialogModule,
    MdSlideToggleModule
  ],
  exports: [
    // required
    CommonModule,

    // layout grid
    FlexLayoutModule,

    // material design
    MdToolbarModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdListModule,
    MdIconModule,
    MdCheckboxModule,
    MdTabsModule,
    MdSnackBarModule,
    MdDialogModule,
    MdSlideToggleModule,

    // directives
    ImageFallbackDirective
  ]
})
export class SharedModule {}
