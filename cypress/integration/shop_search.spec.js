describe('shop search happy path', () => {
    beforeEach(() => {
        cy.visit('https://www.cancerresearchuk.org/get-involved/find-a-shop')
        cy.get('#edit-field-shop-geocode-latlon')
            .type('london')

    });

    it('keeps query in search bar', () => {
        cy.get('#edit-field-shop-geocode-latlon')
            .should('have.value', 'london')
    });

    it('displays list of acurate locations when london entered', () => {
        cy.get('tbody')
            .should('contain', 'London')
    });

    it('still shows london in search bar as you navigate to next page ', () => {
        cy.get('#edit-field-shop-geocode-latlon')
            .submit('london')
        cy.get('div.item-list-pager > ul > li:nth-child(2) > a').click
        cy.get('#edit-field-shop-geocode-latlon')
            .should('have.value', 'london')

    });

    it('shows total number of results on top of page', () => {
        cy.get('div.view-header > div.results-title')
            .should('contain', 'showing 605 results')
    });

});

describe('search bar sad path', () => {
    beforeEach(() => {
        cy.visit('https://www.cancerresearchuk.org/get-involved/find-a-shop')

    });
    it('displays all results when empty query entered', () => {
        cy.get('#edit-field-shop-geocode-latlon')
            .type(' ')
        cy.get('tbody')
            .should('contain', 'Aberdeen')
    });
    it('shows error message for unrecognisable locations', () => {
        cy.get('#edit-field-shop-geocode-latlon')
            .type('%')
        cy.get('.warning ')
            .should('contain', 'The location % could not be resolved and was ignored')
    });
});