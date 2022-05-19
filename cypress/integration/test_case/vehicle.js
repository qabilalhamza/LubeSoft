import VehicleObject from "../page_objects/vehicle"
const vehicle = new VehicleObject();

beforeEach(() => {
    Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.FnG08HaJ2wY', '.AspNetCore.Identity.Application');
    cy.intercept('**/cashier/start-invoice').as('invoice');
    cy.intercept('**/cashier/invoice-preview/details/payments').as('cash');
    cy.intercept('**/comments').as('comment');
});

describe("Login with valid Credentials", function() {
    before("Login", function() {

        cy.doLogin();

    });

    it("search for one vehicle and select vehicle", function() {
        cy.get(vehicle.vehicleSearchBox).type('8AKM153' + '{enter}');
        cy.get(vehicle.vehicleSearchResult).should('have.text', 'CA-8AKM153').click();
        cy.get(vehicle.vehicleSearchResult).click();
    });

    it("search and add inventory item and save the work order id", function() {
        cy.get(vehicle.inventorySearchBox).type('fe');
        cy.get(vehicle.inventorySearchResult).first().click();
        vehicle.saveWorkOrderId();
    });

    it("click to send to cashier nav and close the message validation popup is visible", function() {
        cy.get(vehicle.sendToCashierNav).click();
        cy.get(vehicle.validationMessagePopup).should('be.visible');
        cy.wait(1000);
        cy.get(vehicle.btnClosemessage).should('be.visible').click({
            force: true
        });
    });

    it("enter record odometer value and click to save button", function() {
        cy.contains('Record Current Odometer').should('be.visible');
        cy.get(vehicle.txtRecordOdometer).type('109,000');
        cy.get(vehicle.btnSaveRecordOdometer).click();
    });

    it("close comment popup", function() {
        cy.wait('@comment');
        cy.wait(1000);
        cy.get(vehicle.btnCloseComment).should('be.visible').click({
            force: true
        });

    });

    it("go to cashier invoice nav", function() {
        cy.contains('Search Vehicle').should('be.visible');
        cy.get(vehicle.HomeNav).click();
        cy.contains('LubeSoft Home').should('be.visible');
        cy.get(vehicle.cashierInvoiceNav).click();
    });

    it("select the recently added work order and enter password", function() {
        vehicle.recentlyCreatedWorkOrder();
        vehicle.enterPassword();

     });

    it("do cash payment ", function() {    
        cy.get(vehicle.btnNextLink).click();
        cy.wait('@cash').then(resp => {
        vehicle.clickCashPayment();
        vehicle.enterBalance();
        vehicle.finalizePayment();
    });

});
    
});