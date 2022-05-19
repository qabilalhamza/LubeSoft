import Login from "../page_objects/login"

const objLogin = new Login();

describe("LoginScreen", function() {
    it("Login", function() {

        cy.doLogin();

    });
});

  
