import { Angular2CliScssPage } from './app.po';

describe('angular2-cli-scss App', function() {
  let page: Angular2CliScssPage;

  beforeEach(() => {
    page = new Angular2CliScssPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
