import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { ImageModule } from '@shared/image/image.module';
import { MainRoutingModule } from './main-routing.module';

import { HeaderHttpService } from './services/header-http.service';
import { DesignatorGuard } from './guards/designator.guard';

import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { InnerPageComponent } from './components/inner-page/inner-page.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    ImageModule,
    MainRoutingModule,
  ],
  declarations: [
    MainComponent,
    HeaderComponent,
    MenuComponent,
    InnerPageComponent,
  ],
  providers: [
    HeaderHttpService,
    DesignatorGuard,
  ],
})
export class MainModule {}
