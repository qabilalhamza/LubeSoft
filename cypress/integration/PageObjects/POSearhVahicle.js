class VahicleObject {

    liscence = '6x87895';
    searchField = '#searchBox';
    searchResult = '.row-link > :nth-child(1)';
    startWork = '#startWorkOrderNavLink';
    customerName = '.row-link > :nth-child(1)';
    itemSearch = '#item-search-box';
    firstSearchResult = '#item-search-results tbody>tr';
    wph = "part-number-afc9004f-f69e-4254-ae61-ffacbbdef6c0";
    wphclick = '.table > tbody > tr > :nth-child(1)';
    message = '#message';
    btnClose = '#message-modal-close-btn';
    sendToCashier = '#sendToCashierNavLink';
    fieldToday = '#record-odometer-input';
    btnSave = '#record-odometer-save';
    btnCloseComment = '#cancelCommentModalButton';
    btnHome = '.nav-item > .nav-link';
    cashierInvoice = '#cashierInvoiceNavLink';
    btnOk = '#identify-modal-save';
    btnNext = '#nextLink';
    btnCheck = '#checkPaymentButton';
    btnCash = '#cashPaymentButton';
    btnCreditCard = '#creditCardPaymentButton';
    chckNo = '#checkNumber';
    btnSubmit = '#addCashSubmitButton';
    btnFinalize = '#finalizeButton';
    fieldCash = '#cashInput';
    commentHeading = '#e10d3f434b8250e4ba64646e23c58720815d2c634f8dcc1b6d26ef2cc273c4b06078Label';



    itemSearch() {
        for (let i = 0; i <= 1; i++) {
            if (i == 0) {
                cy.get('.row-delete .required-asterisk').siblings('.form-control').eq(i).type('WPH47{Enter}', {
                    force: true
                }).click();
                cy.get('.required-item-search-results .table-striped>tbody>tr:nth-of-type(odd)').click({
                    multiple: false
                });
            } else if (i == 1) {
                cy.get('.row-delete .required-asterisk').siblings('.form-control').eq(i).clear({
                    force: true
                }).type('5/20{Enter}', {
                    force: true
                }).click();
                cy.get('.required-item-search-results .table-striped>tbody>tr:nth-of-type(odd)').click({
                    multiple: false
                });
            }
        }
    }

    itemQuantity() {
        var num = 4
        for (var x = 0; x < 4; x++) {
            cy.get('.row-delete .form-control.text-end').eq(x).type(num, {
                force: true
            });
            num++;
        }
    }
    enterPassword() {
        cy.get('#password')
            .clear()
            .type('P@ssword1');
        cy.get(this.btnOk).click();
    }

    cashPayment() {
        cy.get('#couponButton').should('be.visible')
        cy.wait(2000);
        cy.get(this.btnCash).click({
            force: true
        });
        cy.get('#balanceDue').then(($btn) => {
            const txt = $btn.text();
            cy.wait(500);
            cy.get(this.fieldCash).clear().should('exist').type(txt);
            cy.get(this.btnSubmit).click();
        });
        cy.contains('Change Due').should('be.visible');
        cy.get(this.btnFinalize).click({
            force: true
        });
        cy.get('#openDrawerButton').click();
        cy.contains('The cash drawer was not detected.').should('be.visible');
        cy.get('#drawerNotFoundOkButton').click();
        cy.get('#printingInProgressOkButton').click();
    }


    finalize() {
        cy.get('#balanceDue').then(($btn) => {
            const txt = $btn.text();
            cy.get(this.fieldCash).clear().should('exist').type(txt);
            cy.get(this.btnSubmit).click();
            cy.get(this.btnFinalize).click({
                force: true
            });
        });
    }

    saveWordOrderId() {
        cy.location('href').then(href => {
            const workOrderId = href.substring(href.lastIndexOf("/") + 1);
            cy.task('setWorkOrderId', workOrderId);

        });
    }

    recentlyCreatedWorkOrder() {
        cy.task('getWorkOrderId').then(wo => {
            cy.get(".table.table-hover.table-focus tr[data-work-order-id='" + wo + "'").eq(0).click({
                force: true
            });

        })

    }

}
export default VahicleObject;