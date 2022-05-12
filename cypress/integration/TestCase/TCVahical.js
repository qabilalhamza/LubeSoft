

import VahicalObject from "../PageObjects/POSearhVahical"
import 'cypress-wait-until';
const vahical = new VahicalObject();

beforeEach(() => {
  Cypress.Cookies.preserveOnce( '.AspNetCore.Antiforgery.FnG08HaJ2wY', '.AspNetCore.Identity.Application');

  cy.intercept('*/work-orders/*/send-to-cashier').as('workOrder')
  cy.intercept('**/users/current').as('user')
  cy.intercept('**/payments/cash/modal').as('modal')
 
  cy.intercept('**/cashier/start-invoice').as('invoice')

  cy.intercept('**/cashier/invoice-preview/details/payments').as('cash')
  cy.intercept('**/comments').as('comment')
});

describe("LoginScreen", function () {
  before("Login", function(){
    cy.doLogin();
    
});
        it("can search Vahical", function () {
            cy.get(vahical.searchField).type('8AKM153'+ '{enter}')
            cy.get(vahical.result).should('have.text', 'CA-8AKM153').click()
            cy.get(vahical.customerName).click()
            cy.get(vahical.itemSearch).type('FE')
            cy.get(vahical.fs1).should('include.text', 'DISPOSAL FEE').click()
         
            cy.location('href').then(href => {
              cy.log(href);
              const workOrderId = href.substring(href.lastIndexOf("/") + 1);
              cy.log("inside --- " + workOrderId);
              cy.task('setWorkOrderId', workOrderId)
            });
                 
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
              cy.wait('@comment')
              cy.wait(2000)
              cy.get('#cancelCommentModalButton').click({force:true})
              cy.contains('Search Vehicle').should('be.visible')
              cy.get(vahical.btnHome).click()
              cy.contains('LubeSoft Home').should('be.visible')
              cy.get(vahical.cashierInvoice).click()
             
             cy.task('getWorkOrderId').then(wo => {
              cy.get(".table.table-hover.table-focus tr[data-work-order-id='" + wo + "'").eq(0).click({force : true});
            })        
             
             //Enter password funtion
              vahical.enterPassword()
              cy.get(vahical.btnNext).click()
              cy.wait('@cash').then(resp =>{
                cy.log('response recieved')
                vahical.cashPayment() 
              })
    }) 
           
       
    it("ISI screen", function () {

      
      



})       
            
             

            })
          



