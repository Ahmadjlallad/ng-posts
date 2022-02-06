import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './component/header/header.component';
import { PostsComponent } from './component/posts/posts.component';
import { PostComponent } from './component/posts/post/post.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { PostsServes } from './shared/posts.service';
import { PaginationComponent } from './component/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    PostComponent,
    SidebarComponent,
    NotFoundComponent,
    ContactUsComponent,
    PaginationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [PostsServes],
  bootstrap: [AppComponent],
})
export class AppModule {}
