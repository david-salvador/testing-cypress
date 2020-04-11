//import { HomeComponent } from './home/home.component';

import { Routes } from '@angular/router';
import { UserDetailsComponent } from './components/i3-user-details/user-details.component';
import { UsersComponent } from './components/10-user-component/users.component';
import { TodosComponent } from './components/06-services/todos.component';

export const routes: Routes = [
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'todos', component: TodosComponent },
  { path: '', component: TodosComponent },
];
