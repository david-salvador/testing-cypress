import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<
      string
    >;
  }
}

export class UserListAppPage {
  navigateTo() {
    return browser.get('/dashboard');
  }

  getTitle() {
    const header = by.css('h2');
    return element(header).getText();
  }

  getUnorderedList() {
    const list = by.css('ul');
    return element(list).isPresent();
  }

  getClearButton() {
    const button = by.css('button');
    return element(button);
  }

  getUsers() {
    const item = by.css('li');
    return element.all(item);
  }
}
