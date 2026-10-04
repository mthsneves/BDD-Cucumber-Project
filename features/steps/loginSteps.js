import 'chromedriver';
import { Given, When, Then, After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { expect } from 'chai';

setDefaultTimeout(60000); // 60 segundos para evitar timeout do driver

let driver;

Before(async function () {
    let options = new chrome.Options();
    options.addArguments('--headless=new');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    
    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
});

Given('que o usuário está na página de login', async function () {
    await driver.get('https://horadoqa.github.io/login/'); 
    await driver.wait(until.elementLocated(By.id('username')), 10000);
});

When('o usuário insere o email {string} e a senha {string}', async function (email, password) {
    const usernameField = await driver.findElement(By.id('username'));
    const passwordField = await driver.findElement(By.id('password'));
    const loginButton = await driver.findElement(By.id('button')); // O id correto no HTML é 'button'

    await usernameField.sendKeys(email);
    await passwordField.sendKeys(password);
    await loginButton.click();
});

When('o usuário deixa os campos de email e senha vazios', async function () {
    const loginButton = await driver.wait(until.elementLocated(By.id('button')), 10000);
    await loginButton.click();
});

Then('ele deve ser redirecionado para a página de boas-vindas', async function () {
   // A mensagem 'Bem-vindo' está na seção 'sobre'
   const welcomeMessage = await driver.wait(until.elementLocated(By.id('sobre')), 10000);
   const messageText = await welcomeMessage.getText();
   expect(messageText).to.include('Bem-vindo');
});

Then('ele deve ver uma mensagem de erro indicando falha no login', async function () {
    const errorMessage = await driver.wait(until.elementLocated(By.id('error-message')), 10000);
    const errorText = await errorMessage.getText();
    expect(errorText).to.include('E-mail ou senha inválidos!'); // O texto correto retornado pela página
});

Then('ele deve ver uma mensagem de erro informando que os dados são obrigatórios', async function () {
    const errorMessage = await driver.wait(until.elementLocated(By.id('error-message')), 10000);
    const errorText = await errorMessage.getText();
    expect(errorText).to.include('E-mail e senha são obrigatórios!'); // O texto correto retornado pela página
});

After(async function () {
    if (driver) {
        await driver.quit();
    }
});