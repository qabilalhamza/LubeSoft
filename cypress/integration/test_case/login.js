import LoginObject from "../PageObjects/login"

const login = new LoginObject();

describe("LoginScreen", function() {
    it("Login", function() {

        cy.doLogin();

    });
});

  
