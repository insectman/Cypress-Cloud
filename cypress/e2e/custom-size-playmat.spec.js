describe('Custom Size Playmat', () => {
  const previewThemeId = Cypress.env('PREVIEW_THEME_ID') // Get the environment variable

  beforeEach(() => {
    cy.visit(`https://www.yourplaymat.com/products/custom-size-playmat?_ab=0&_fd=0&_sc=1&preview_theme_id=${previewThemeId}`)
  })

  context('Navigate to Custom Size Playmat', () => {
    it('Should successfully navigate to Custom Size Playmat', () => {
      cy.navigateToSubMenuItem(Cypress.env('MENU_ITEMS').customSizePlaymat).then(() => {
        cy.location('href').then((href) => {
          expect(href).to.contain(
            Cypress.env('MENU_ITEMS').customSizePlaymat.path,
          )

          Cypress.log({
            name: 'afterNav',
            // shorter name for the Command Log
            displayName: 'setSS',
            message: 'After nav',
            consoleProps: () => {
              // return an object which will
              // print to dev tools console on click
              return {
                'log ret val': 'an',
              }
            },
          })
        })
        // Get the file path of the image to upload
        // const imagePath = './images/image_upload_test.jpg'

        // Attach the file to the file input element
        cy.get('.upload-image', { timeout: 10000 }).should('be.visible')
        cy.get('.upload-image').click()
        cy.get('.uploadcare--dialog__container', { timeout: 10000 }).should('be.visible')
        cy.get('.uploadcare--button_primary.uploadcare--dragging__hide').click()

      // cy.get('.success-message').should('be.visible')
      })
    })
  })
})
