class VehicleObject {

    vehicleSearchBox = '#searchBox';
    vehicleSearchResult = '.row-link > :nth-child(1)';
    inventorySearchBox = '#item-search-box';
    inventorySearchResult = '#item-search-results tbody>tr';
    validationMessagePopup = '#message';
    btnClosemessage = '#message-modal-close-btn';
    sendToCashierNav = '#sendToCashierNavLink';
    txtRecordOdometer = '#record-odometer-input';
    btnSaveRecordOdometer = '#record-odometer-save';
    btnCloseComment = '#cancelCommentModalButton';
    HomeNav = '.nav-item > .nav-link';
    cashierInvoiceNav = '#cashierInvoiceNavLink';
    btnOkPassword = '#identify-modal-save'
    btnNextLink = '#nextLink';
    btnCashPayment = '#cashPaymentButton';
    btnSubmitCash = '#addCashSubmitButton';
    btnFinalize = '#finalizeButton';
    inputCash = '#cashInput';
    openDrawer ='#openDrawerButton';
    btnOKInProgress = '#printingInProgressOkButton';
    btnOkDrawer = '#drawerNotFoundOkButton';


    enterPassword() {

        cy.get('#password')
            .clear()
            .type('P@ssword1');
        cy.get(this.btnOkPassword).click();
    }

    clickCashPayment() {
        cy.get('#couponButton').should('be.visible')
        cy.wait(2000);
        cy.get(this.btnCashPayment).click({
            force: true
        });
    }
    enterBalance(){
        cy.get('#balanceDue').then(($btn) => {
            const txt = $btn.text();
            cy.wait(500);
            cy.get(this.inputCash).clear().should('exist').type(txt);
            cy.get(this.btnSubmitCash).click();
        });
    }
    
    finalizePayment(){
        cy.contains('Change Due').should('be.visible');
        cy.get(this.btnFinalize).click({
            force: true
        });

        cy.get(this.openDrawer).click();
        cy.contains('The cash drawer was not detected.').should('be.visible');
        cy.get(this.btnOkDrawer).click();
        cy.get(this.btnOKInProgress).click();
    }

    saveWorkOrderId() {
        cy.location('href').then(href => {
            const workOrderId = href.substring(href.lastIndexOf("/") + 1);
            cy.task('setWorkOrderId', workOrderId);

        });
    }

    recentlyCreatedWorkOrder() {
        cy.task('getWorkOrderId').then(workOrderId => {
            cy.get(".table.table-hover.table-focus tr[data-work-order-id='" + workOrderId + "'").eq(0).click({
                force: true
            });

        })

    }

}

export default VehicleObject;