const Browser = require("./Browser");
const browser = new Browser();
const timeout = 20000;

beforeAll(async () => {
    browser.browserBuild();
}, timeout);

beforeEach(async () => {
    await browser.browserNavigate('http://localhost:8080');
}, timeout);

afterAll(async () => {
    await browser.browserExit();
}, timeout);

test('Initially has a header', async () => {
    const element = await browser.getElementByCss("h1");
    const tagName = await element.getTagName();
    expect(tagName).toBe('h1');

})
//my new test
test("Click removes item from list", async () => {
    const tickClick = await browser.getElement('action-1');
    await tickClick.click();
    await browser.getElement('action-1')

    const listItem = await browser.getElement('item-1')
    const itemText = await listItem.getText();
    expect(itemText).toBe('A dozen eggs');
    
})

test("Add item to list", async () => {
    const newItem = ('Orange juice')
    const listInput = await browser.getElement('new-item');
    const listSubmit = await browser.getElement('create-item');

    await listInput.sendKeys(newItem);
    await listSubmit.click();
    await browser.waitForElementByCss('.svelte-bfi8g9', timeout/2);

    const newLine = await browser.getElement('item-1')
    
    const text = await newLine.getText();
    expect(text).toBe('Orange juice');
})