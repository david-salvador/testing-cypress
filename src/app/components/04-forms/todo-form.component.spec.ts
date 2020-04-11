import { TodoFormComponent } from './todo-form.component';

import { FormBuilder, FormControl } from '@angular/forms';

describe('0400 TodoFormComponent', () => {
  var component: TodoFormComponent;

  beforeEach(() => {
    component = new TodoFormComponent(new FormBuilder());
  });

  it('00 should create a form with 2 controls', () => {
    //expect(component.form.contains('name')).toBe(true);
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
  });

  it('05 should make the name control required', () => {
    let control: FormControl = component.form.get('name') as FormControl;

    control.setValue(''); // at this point this control should be invalid

    expect(control.valid).toBeFalsy();
  });

  //we could have more tests if we had more validators.
});
