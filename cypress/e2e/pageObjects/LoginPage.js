class LoginPage {
    elements = {
      loginButton: () => cy.get('#login2'),
      usernameInput: () => cy.get('#loginusername'),
      passwordInput: () => cy.get('#loginpassword'),
      submitButton: () => cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary'),
      welcomeMessage: () => cy.get('#nameofuser'),
      alertMessage: () => cy.get('.sweet-alert > h2')
    };
    
    ALERT_CONST =   {
        "WRONG_PASSWORD": "Wrong password.",
        "USER_NOT_EXIST": "User does not exist.",
        "USER_OR_PASSWORD_EMPTY": "Please fill out Username and Password.",
    }

    clickLoginButton() {
      this.elements.loginButton().click();
    }
  
    enterUsername(username) {
      if (username) {
        this.elements.usernameInput().type(username);
      }
    }
  
    enterPassword(password) {
      if (password) {
        this.elements.passwordInput().type(password);
      }
    }
  
    clickSubmit() {
      this.elements.submitButton().click();
    }
  
    verifyLoginSuccess(username) {
      this.elements.welcomeMessage().should('contain', `Welcome ${username}`);
    }

    verifyWrongPasswordAlert() {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      this.clickSubmit();
      cy.wait(500);  
      cy.wrap(stub).should('have.been.calledOnceWith', this.ALERT_CONST.WRONG_PASSWORD);
    }
  
    verifyUserNotExistAlert() {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      this.clickSubmit();
      cy.wait(500);  
      cy.wrap(stub).should('have.been.calledOnceWith', this.ALERT_CONST.USER_NOT_EXIST);
    }
    
    verifyEmptyUsernameOrPasswordAlert() {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      this.clickSubmit();
      cy.wait(500);  
      cy.wrap(stub).should('have.been.calledOnceWith', this.ALERT_CONST.USER_OR_PASSWORD_EMPTY);
    }    
  }
  
  
module.exports = new LoginPage();
  