import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { WorksComponent } from './works/works.component';
import { SkillsComponent } from './skills/skills.component';
import { ContactComponent } from './contact/contact.component';
import { BannerHomeComponent } from './banner-home/banner-home.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServDeleteService } from './serv-delete.service';
import { WorkPageComponent } from './work-page/work-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component'
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { interceptorProvider } from './interceptor/interceptor.service';
import { ProdGuardService as guard } from './guards/guard.service';
import { LoginCardComponent } from './login-card/login-card.component';
import { CertificacionComponent } from './certificacion/certificacion.component';


const appRoutes: Routes = [

  { path: '', component: HomePageComponent },
  { path: 'works', component: WorkPageComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'user', component: UserComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: '**', redirectTo: '/' }
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    ExperienceComponent,
    EducationComponent,
    WorksComponent,
    SkillsComponent,
    ContactComponent,
    BannerHomeComponent,
    FooterComponent,
    WorkPageComponent,
    HomePageComponent,
    LoginComponent,
    UserComponent,
    LoginCardComponent,
    CertificacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //FontAwesomeModule
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    
  ],
  providers: [ServDeleteService, interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
