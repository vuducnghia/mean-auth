import { MeanAuthPage } from './app.po';

describe('mean-auth App', function() {
  let page: MeanAuthPage;

  beforeEach(() => {
    page = new MeanAuthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
