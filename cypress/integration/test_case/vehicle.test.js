import Vehicle from "../page_objects/vehicle"
const objVehicle = new Vehicle();

beforeEach(() => {
    Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.FnG08HaJ2wY', '.AspNetCore.Identity.Application');
    cy.intercept('**/cashier/start-invoice').as('invoice');
    cy.intercept('**/cashier/invoice-preview/details/payments').as('cash');
    cy.intercept('**/comments').as('comment');
});

describe("login with valid credentials", function() {
    before("Login", function() {

        cy.doLogin();

    });

    it("search for one vehicle and select vehicle", function() {
        cy.get(objVehicle.txtVehicleSearchBox).type('8AKM153' + '{enter}');
        cy.get(objVehicle.vehicleSearchResult).should('have.text', 'CA-8AKM153').click();
        cy.get(objVehicle.vehicleSearchResult).click();
    });

    it("search and add inventory item and save the work order id", function() {
        cy.get(objVehicle.txtInventorySearchBox).type('fe');
        cy.get(objVehicle.inventorySearchResult).first().click();
        objVehicle.saveWorkOrderId();
    });

    it("click send to cashier nav and close the message validation popup", function() {
        cy.get(objVehicle.navSendToCashier).click();
        cy.get(objVehicle.validationMessagePopup).should('be.visible');
        cy.wait(1000);
        cy.get(objVehicle.btnCloseMessage).should('be.visible').click({
            force: true
        });
    });

    it("enter record odometer value and click to save button", function() {
        cy.contains('Record Current Odometer').should('be.visible');
        cy.get(objVehicle.txtRecordOdometer).type('110,000');
        cy.get(objVehicle.btnSaveRecordOdometer).click();
    });

    it("close comment popup", function() {
        cy.wait('@comment'); 
        cy.wait(1000);
        cy.get(objVehicle.btnCloseComment).should('be.visible').click({
            force: true
        });

    });

    it("go to cashier invoice nav", function() {
        cy.contains('Search Vehicle').should('be.visible');
        cy.get(objVehicle.navHome).click();
        cy.contains('LubeSoft Home').should('be.visible');
        cy.get(objVehicle.navCashierInvoice).click();
    });

    it("select the recently created work order and enter password", function() {
        objVehicle.recentlyCreatedWorkOrder();
        objVehicle.enterPassword();

     });

    it("do cash payment ", function() {    
        cy.get(objVehicle.btnNextLink).click();
        cy.wait('@cash').then(resp => {
            objVehicle.clickCashPayment();
            objVehicle.enterBalance();
            objVehicle.finalizePayment();
    });

});
    
});