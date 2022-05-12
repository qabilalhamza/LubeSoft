import LoginObject from "../PageObjects/Login"

const login = new LoginObject();

  describe("LoginScreen", function () {
    it("Login", function(){
        cy.doLogin();  
      
    });
});


  
