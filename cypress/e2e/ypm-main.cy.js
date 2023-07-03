describe('YPM Test', () => {
  it('Custom Size Playmat is accessible', () => {
    cy.visit(
      'https://www.yourplaymat.com/?_ab=0&_fd=0&_sc=1&preview_theme_id=121423626321',
    )

    cy.navigateToSubMenuItem(Cypress.env('menuItems').customSizePlaymat).then(
      () => {
        cy.location('href').then((href) => {
          expect(href).to.contain(
            Cypress.env('menuItems').customSizePlaymat.path,
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

        Cypress.log({
          name: 'beforeOpenUploadImageDialog',
          // shorter name for the Command Log
          displayName: 'setSS',
          message: 'Before open upload image dialog',
          consoleProps: () => {
            // return an object which will
            // print to dev tools console on click
            return {
              'log ret val': 'bouid',
            }
          },
        })

        cy.openUploadImageDialog()
      },
    )
  })
})
