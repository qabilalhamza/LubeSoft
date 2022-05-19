class LoginObject {

    userName = '#UserName';
    password = '#Password';
    btnSignin = '#signInButton';

    url = Cypress.config().loginCredentials.baseUrl;
    txtUserName = "#UserName";
    txtPassword = "#Password";

    navigate() {
        cy.visit(url);
        cy.contains('Sign in to LubeSoft').should('be.visible');
    }
    
    doLogin(email, password) {
        EnterValidUserName(email);
        enterPassword(password);
        btnLogin();
    }

    enterValidUserName(username) {
        cy.get('#UserName').type(username);
        return this;
    }

    enterPassword(password) {
        cy.get('#Password')
            .clear()
            .type(password);
        return this;
    };

    btnLogin() {
        cy.get('#signInButton').click();
    };
};

export default LoginObject;