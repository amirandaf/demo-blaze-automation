const USERNAME = 'an1'
const PASSWORD = '123'
const WRONG_PASSWORD = '1234'
const loginPage = require('../pageObjects/LoginPage');

describe('template spec', () => {
  
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/index.html')
  })
  
  it('Login with valid credentials', () => {
    loginPage.clickLoginButton();

    cy.waitForNetworkIdle(2000);
    loginPage.enterUsername(USERNAME);
    loginPage.enterPassword(PASSWORD);
    loginPage.clickSubmit();
    
    loginPage.verifyLoginSuccess(USERNAME);
  });

  it('Login with wrong password', () => {
    loginPage.clickLoginButton();
    cy.waitForNetworkIdle(2000);
    
    loginPage.enterUsername(USERNAME);
    loginPage.enterPassword(WRONG_PASSWORD);
    loginPage.verifyWrongPasswordAlert();
    
  })

  it('Empty user', () => {
    loginPage.clickLoginButton();
    cy.waitForNetworkIdle(2000);
    
    loginPage.enterUsername('');
    loginPage.enterPassword(PASSWORD);
    loginPage.verifyEmptyUsernameOrPasswordAlert();
    
  })


  it('Empty pass', () => {
    loginPage.clickLoginButton();
    cy.waitForNetworkIdle(2000);
    
    loginPage.enterUsername(USERNAME);
    loginPage.enterPassword('');
    loginPage.verifyEmptyUsernameOrPasswordAlert();
    
  })

  it('Non-existent user', () => {
    loginPage.clickLoginButton();
    cy.waitForNetworkIdle(2000);
    
    loginPage.enterUsername(Date.now().toString());
    loginPage.enterPassword(PASSWORD);
    loginPage.verifyUserNotExistAlert();
    
  })



})