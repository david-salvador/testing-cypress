import { routes } from './app.routes';
import { UsersComponent } from '../../../testing-udemy/src/app/10- user-component/users.component';
import { TodosComponent } from '../../../testing-udemy/src/app/i2-todos/todos.component';

describe('routes', () => {
  // it('should contain a route for /users', () => {
  //     expect(routes).toContain({ path: 'users', component: UsersComponent});
  // });
  it('should contain a route for /todos', () => {
    expect(routes).toContain({ path: 'todos', component: TodosComponent });
  });
});
