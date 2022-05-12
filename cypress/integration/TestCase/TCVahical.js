

import VahicalObject from "../PageObjects/POSearhVahical"
import 'cypress-wait-until';
const vahical = new VahicalObject();
beforeEach(() => {
  Cypress.Cookies.preserveOnce( '.AspNetCore.Antiforgery.FnG08HaJ2wY', '.AspNetCore.Identity.Application');

  cy.intercept('*/work-orders/*/send-to-cashier').as('workOrder')
  cy.intercept('**/users/current').as('user')
 
  cy.intercept('**/cashier/start-invoice').as('invoice')
  cy.intercept('**/payments/*').as('cash')
  cy.intercept('**/cashier/invoice-preview/details/payments').as('pay')
});

describe("LoginScreen", function () {
  before("Login", function(){
    cy.doLogin();
    
});
        it("can search Vahical", function () {
            cy.get(vahical.searchField).type('8AKM153'+ '{enter}')
            cy.get(vahical.result).click()
            cy.get(vahical.customerName).click()
            cy.get(vahical.itemSearch).type('FE')
            cy.get(vahical.fs1).click()
            vahical.currentuRl()
                      
        })
        xit("can search item", function () {
          vahical.Search()
          vahical.quantity() 
        })
        it("Send to Cashier", function () {
           cy.get(vahical.sendToCashier).click()
           cy.get(vahical.message).should('be.visible')
           cy.wait(1000)
           cy.get("#message-modal-close-btn").should('be.visible').click({force:true});
           cy.contains('Record Current Odometer').should('be.visible')
           cy.get(vahical.fieldToday).type('5000')
           cy.get(vahical.btnSave).click()
    
            })


             it("Cashier Invoice", function () {
              cy.wait(4000)
              cy.get('#cancelCommentModalButton').click()
              cy.contains('Search Vehicle').should('be.visible')
              cy.get(vahical.btnHome).click()
              cy.contains('LubeSoft Home').should('be.visible')
              cy.get(vahical.cashierInvoice).click()
              cy.contains('Name').should('be.visible')
             //Enter password funtion
              vahical.enterPassword()
            
    }) 
           
              it("ISI screen", function () {
              cy.get(vahical.btnNext).click()
              cy.wait('@cash')
              //Create cashpayment function
              vahical.cashPayment() 
            })
          
            
      
            })




