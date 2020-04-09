//import { HomeComponent } from './home/home.component';
import { TodosComponent } from '../../../testing-udemy/src/app/i2-todos/todos.component';
import { UsersComponent } from '../../../testing-udemy/src/app/10- user-component/users.component';
import { UserDetailsComponent } from '../../../testing-udemy/src/app/i3-user-details/user-details.component';

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'todos', component: TodosComponent },
  { path: '', component: TodosComponent },
];
