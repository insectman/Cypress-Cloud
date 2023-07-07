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

        //Expand the Stitched Edging options.
        cy.xpath('//*[@id="page"]/main/div[2]/div[1]/div[2]/div/form/div[7]/div/div[2]/ul')
        .then(($element) => {
          // Check if the element has the 'collapse-list' class
          if ($element.hasClass('collapse-list')) {
            cy.wrap($element).click()
            cy.log('Stitched Edges was expanded')
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

        //Expand Card Zones options.
        cy.xpath('//*[@id="page"]/main/div[2]/div[1]/div[2]/div/form/div[12]/div/div[2]/ul')
        .then(($element) => {
          // Check if element has 'collapse-list' class
          if ($element.hasClass('collapse-list')) {
            cy.wrap($element).click()
            cy.log('Card Zones was expanded')
          }
        })
        .then(() => {
          //Test all <li>s
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

        // Collapse the drop down list
        cy.xpath('//*[@id="page"]/main/div[2]/div[1]/div[2]/div/form/div[12]/div/div[2]/ul').click()

        // Check selecting Quantity
        // Check initial value
        cy.get('#quantity')
        .should('have.value', '1')
        .then(() => cy.log('Initial value checked: 1'))

        // Click the plus button to increment the value
        cy.get('.quantity-selector .plus')
        .then(($btn) => {
          for (let i = 0; i < 5; i++) {
            cy.wrap($btn).click()
          }
        })
        .then(() => {
          // Assert that the value has been incremented
          cy.get('#quantity')
          .should('have.value', '6')
          .then(() => cy.log('Plus button works'))
        })

        // Click the minus button to decrement the value
        cy.get('.quantity-selector .minus')
        .click()
        .then(() => {
          // Assert that the value has been decremented
          cy.get('#quantity')
          .should('have.value', '5')
          .then(() => cy.log('Minus button works'))
        })

        //********************** Check Add to Cart *********************
        cy.contains('button', 'add to cart').click()
        .then(() => {
          cy.log('Add to cart button clicked successfully')
        })
        .then(() => {
          cy.get('.slide-cart-sidebar.expanded')
          .should('exist')
          .then(() => {
            cy.log('Cart sidebar is expanded as expected')
          })
        })

        // Get size to comapre with cart.
        cy.get('.product-money')
        .invoke('text')
        .then((fullText) => {
          const parts = fullText.split('x')

          let width = parts[0].trim()
          let height = parts[1].split('inch')[0].trim()

          Cypress.env('size', { width, height })

          cy.log('Width:', width)
          cy.log('Height:', height)
        })
        .then(() => {
          // Get price to comapre with cart.
          cy.get('.product-money .text-money').invoke('text')
          .then((fullText) => {
            // Get decimal places in the text
            const match = fullText.match(/(\d+\.\d+)/)
            let price

            // If a match was found, convert it to a number and assign it to `price`
            if (match) {
              price = parseFloat(match[1])
            }

            Cypress.env('price', price)
          })

          // Get quantity to comapre with cart.
          cy.get('#quantity').then(($el) => {
            let quantity = $el.text()

            Cypress.env('quantity', quantity)
          })
        })
        .then(() => {
          //********************** Test Cart ********************
          cy.testCart('Custom Size Playmat', Cypress.env('size'), Cypress.env('quantity'), Cypress.env('price'))
        })
        .then(() => {
          //*********************** Test Check Out****************
          cy.testCheckOut('Custom Size Playmat', Cypress.env('size'), Cypress.env('price'))
        })
      },
    )
  })
})
