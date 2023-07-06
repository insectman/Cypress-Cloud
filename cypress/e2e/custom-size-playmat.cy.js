context('Custom Size Playmat', () => {
  it('Custom Size Playmat is accessible', () => {
    const previewThemeId = Cypress.env('PREVIEW_THEME_ID') // Get the environment variable

    cy.visit(`https://www.yourplaymat.com?_ab=0&_fd=0&_sc=1&preview_theme_id=${previewThemeId}`)

    cy.navigateToSubMenuItem(Cypress.env('MENU_ITEMS').customSizePlaymat).then(
      () => {
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

        //***************Check image uploading**************************************
        //Check opening dialog for image uploading
        cy.openUploadImageDialog()

        //Check image editing and uploading
        cy.selectImage()

        //***************Check setting ADDONS**************************************
        //Check Stitched Edging.
        //Select Stitched Edging.
        cy.xpath('//*[@id="page"]/main/div[2]/div[1]/div[2]/div/form/div[7]')
        .click()
        .then(($element) => {
          cy.log('Stitched Edging has been clicked')
          cy.wrap($element).should('have.class', 'active')
            .then(() => {
              cy.log('Stitched Edging has been activated')
            })
        })

        //Extend the Stitched Edging options.
        cy.xpath('//*[@id="page"]/main/div[2]/div[1]/div[2]/div/form/div[7]/div/div[2]/ul')
        .then(($element) => {
          // Check if the element has the 'collapse-list' class
          if ($element.hasClass('collapse-list')) {
            cy.wrap($element).click()
            cy.log('Stitched Edges was extended')
          }
        })

        //Check if the optios are selectable.
        cy.xpath('//*[@id="page"]/main/div[2]/div[1]/div[2]/div/form/div[7]/div/div[2]/ul/li[2]')
        .click()
        .then(() => {
          cy.xpath('//*[@id="page"]/main/div[2]/div[1]/div[2]/div/form/div[7]/div/div[2]/ul')
          .should('have.class', 'collapse-list')
          .then(() => {
            cy.log('Stitched Edges options are selectable.')
          })
        })

        //Check Premium Editing.
        //Select Premium Editing.
        cy.xpath('//*[@id="page"]/main/div[2]/div[1]/div[2]/div/form/div[9]')
        .click()
        .then(($element) => {
          cy.log('Premium Editing has been clicked')
          cy.wrap($element).should('have.class', 'active')
            .then(() => {
              cy.log('Premium Editing has been activated')
            })
        })

        //Check edit box for Premium Editing.
        cy.xpath('//*[@id="page"]/main/div[2]/div[1]/div[2]/div/form/div[11]/textarea')
        .should('exist')
        .then(($editBox) => {
          cy.wrap($editBox).type('Sample Text')
          .should('have.value', 'Sample Text')
          .then(() => {
            cy.log('Premium Editing is working.')
          })
        })

        //Check Card Zones.
        //Select Card Zones.
        cy.xpath('//*[@id="page"]/main/div[2]/div[1]/div[2]/div/form/div[12]')
        .click()
        .then(($element) => {
          cy.log('Card Zones has been clicked')
          cy.wrap($element).should('have.class', 'active')
            .then(() => {
              cy.log('Card Zones has been activated')
            })
        })

        //Extend Card Zones options.
        cy.xpath('//*[@id="page"]/main/div[2]/div[1]/div[2]/div/form/div[12]/div/div[2]/ul')
        .then(($element) => {
          // Check if element has 'collapse-list' class
          if ($element.hasClass('collapse-list')) {
            cy.wrap($element).click()
            cy.log('Card Zones was extended')
          }
        })
        .then(() => {
          cy.xpath('//*[@id="page"]/main/div[2]/div[1]/div[2]/div/form/div[12]/div/div[2]/ul')
          .find('li').each(($el, index, $list) => {
            cy.wrap($el).click().then(() => {
              cy.log(`Option at index ${index} clicked successfully`)
            })
            .then(() => {
              cy.xpath('//*[@id="page"]/main/div[2]/div[1]/div[2]/div/form/div[12]/div/div[2]/ul').click()
            })
          })
        })
      },
    )
  })
})
