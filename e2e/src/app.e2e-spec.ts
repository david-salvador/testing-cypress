import { AppPage, UserListAppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Testing User List App', () => {
  let page: AppPage;
  let userListAppPage: UserListAppPage;

  beforeEach(() => {
    page = new AppPage();
    userListAppPage = new UserListAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('testing-cypress app is running!');
  });

  it('should have a title', () => {
    const title = userListAppPage.getTitle();

    expect(title).toBe('Users Online Now');
  });

  it('should have an unordered list', () => {
    const listElement = userListAppPage.getUnorderedList();

    expect(listElement).toBeTruthy();
  });

  it('should have 16 users in the default list', () => {
    const total = 16;
    const clearButton = userListAppPage.getClearButton();
    const users = userListAppPage.getUsers();

    clearButton.click();

    expect(users.count()).toBe(total);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
