import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { PostComponent } from './component/posts/post/post.component';
import { PostsComponent } from './component/posts/posts.component';

const routes: Routes = [
  {
    path: 'posts/:postId',
    component: PostComponent,
  },
  { path: '', component: PostsComponent },
  { path: ':pageId', component: PostsComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
