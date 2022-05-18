import LoginObject from "../PageObjects/PageObjectLogin"

const login = new LoginObject();

describe("LoginScreen", function() {
    it("Login", function() {

        cy.doLogin();

    });
});

  
