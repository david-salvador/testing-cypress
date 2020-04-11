import { routes } from './app.routes';
import { TodosComponent } from './components/06-services/todos.component';
import { UsersComponent } from './components/10-user-component/users.component';

describe('routes', () => {
  it('should contain a route for /users', () => {
    expect(routes).toContain({ path: 'users', component: UsersComponent });
  });
  it('should contain a route for /todos', () => {
    expect(routes).toContain({ path: 'todos', component: TodosComponent });
  });
});
