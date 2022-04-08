import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
import { StudioComponent } from './studio/studio.component';
import { WorksComponent } from './works/works.component';
import { SkillsComponent } from './skills/skills.component';
import { ContactComponent } from './contact/contact.component';
import { BannerHomeComponent } from './banner-home/banner-home.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ServDeleteService } from './serv-delete.service';
import { ServDataService } from './serv-data.service';
import { WorkPageComponent } from './work-page/work-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const appRoutes: Routes = [

  { path: '', component: HomePageComponent },
  { path: 'works', component: WorkPageComponent }

]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    ExperienceComponent,
    StudioComponent,
    WorksComponent,
    SkillsComponent,
    ContactComponent,
    BannerHomeComponent,
    FooterComponent,
    WorkPageComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //FontAwesomeModule
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServDeleteService, ServDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
