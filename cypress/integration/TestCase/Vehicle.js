import VehicleObject from "../PageObjects/SearhVehicle"
import 'cypress-wait-until';
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

    it("Search for one vehicel and click to vehicel search result", function() {
        cy.get(vehicle.vehicleSearchBox).type('8AKM153' + '{enter}');
        cy.get(vehicle.vehicleSearchResult).should('have.text', 'CA-8AKM153').click();
        cy.get(vehicle.vehicleSearchResult).click();
    });

    it("search and add inventory item and save the workOrder id", function() {
        cy.get(vehicle.inventorySearchBox).type('fe');
        cy.get(vehicle.firstSearchResult).first().click();
        vehicle.saveWorkOrderId();
    });

    it("click to send to cashier nav close the popup when validation message popup is visible", function() {
        cy.get(vehicle.sendToCashierNav).click();
        cy.get(vehicle.validationMessagePopup).should('be.visible');
        cy.wait(1000);
        cy.get(vehicle.messageBtnClose).should('be.visible').click({
            force: true
        });
    });

    it("add recordOdometer and click to save button", function() {
        cy.contains('Record Current Odometer').should('be.visible');
        cy.get(vehicle.recordOdometerInputField).type('105,000');
        cy.get(vehicle.recodometerBtnSave).click();
    });

    it("close comment popup", function() {
        cy.wait('@comment');
        cy.wait(1000);
        cy.get(vehicle.commentBtnClose).should('be.visible').click({
            force: true
        });

    });

    it("go to Cashier Invoice nav", function() {
        cy.contains('Search Vehicle').should('be.visible');
        cy.get(vehicle.HomeNav).click();
        cy.contains('LubeSoft Home').should('be.visible');
        cy.get(vehicle.cashierInvoiceNav).click();
    });

    it("select the recently added work Order and enter password", function() {
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