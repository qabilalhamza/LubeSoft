import LoginObject from "../page_objects/login"

const login = new LoginObject();

describe("LoginScreen", function() {
    it("Login", function() {

        cy.doLogin();

    });
});

  
