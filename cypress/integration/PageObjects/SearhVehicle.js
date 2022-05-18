class VehicleObject {

    vehicleSearchBox = '#searchBox';
    vehicleSearchResult = '.row-link > :nth-child(1)';
    inventorySearchBox = '#item-search-box';
    firstSearchResult = '#item-search-results tbody>tr';
    validationMessagePopup = '#message';
    messageBtnClose = '#message-modal-close-btn';
    sendToCashierNav = '#sendToCashierNavLink';
    recordOdometerInputField = '#record-odometer-input';
    recodometerBtnSave = '#record-odometer-save';
    commentBtnClose = '#cancelCommentModalButton';
    HomeNav = '.nav-item > .nav-link';
    cashierInvoiceNav = '#cashierInvoiceNavLink';
    btnOk = '#identify-modal-save'
    btnNextLink = '#nextLink';
    btnCheck = '#checkPaymentButton';
    btnCash = '#cashPaymentButton';
    btnSubmit = '#addCashSubmitButton';
    btnFinalize = '#finalizeButton';
    fieldCash = '#cashInput';
    openDrawer ='#openDrawerButton'
    btnOKInProgress = '#printingInProgressOkButton'
    btnOkDrawer = '#drawerNotFoundOkButton'
    commentHeading = '#e10d3f434b8250e4ba64646e23c58720815d2c634f8dcc1b6d26ef2cc273c4b06078Label';


    enterPassword() {

        cy.get('#password')
            .clear()
            .type('P@ssword1');
        cy.get(this.btnOk).click();
    }

    clickCashPayment() {
        cy.get('#couponButton').should('be.visible')
        cy.wait(2000);
        cy.get(this.btnCash).click({
            force: true
        });
    }
    enterBalance(){
        cy.get('#balanceDue').then(($btn) => {
            const txt = $btn.text();
            cy.wait(500);
            cy.get(this.fieldCash).clear().should('exist').type(txt);
            cy.get(this.btnSubmit).click();
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