import 'cypress-file-upload'
import '@testing-library/cypress/add-commands'

Cypress.Commands.add(
  'getMenu',
  () => cy.get('.mainmenu-container', { timeout: 5000 }), /* ,
        .then(($el) => cy.wrap($el))
    {
      validate: () => {
        cy.get('.mainmenu-container', { timeout: 5000 }).should('be.visible')
      }
    } */
)

Cypress.Commands.add(
  'getParentMenuItem',
  { prevSubject: 'element' },
  (menu, subMenuItem) => {
    /*     const { parentMenuItemLabel } = subMenuItem

    console.log({ subMenuItem, parentMenuItemLabel }) */

    // cy.wrap(subject).contains(mainMenuItemLabel).debug()
    return cy.wrap(menu).contains(subMenuItem.parentMenuItemLabel)
  }, /* ,
    {
      validate: (subject) => {
        subject.contains(mainMenuItemLabel)
      }
    } */
)

Cypress.Commands.add(
  'hoverParentMenuItem',
  { prevSubject: 'element' },
  (menu, subMenuItem) => {
    return cy.wrap(menu).getParentMenuItem(subMenuItem).trigger('mouseover')
  },
  {
    validate: (menu) => {
      cy.wrap(menu).find('.mainmenu-dropdown-wrapper').should('be.visible')
    },
  },
)

Cypress.Commands.add(
  'clickSubMenuItem',
  { prevSubject: 'element' },
  (menu, subMenuItem) => {
    return cy
        .wrap(menu)
        .find('.mainmenu-dropdown-wrapper')
        .contains(subMenuItem.label)
        .click()
  }, /* ,
    {
      validate: (subject) => {
        subject.contains(mainMenuItemLabel)
      }
    } */
)

Cypress.Commands.add(
  'navigateToSubMenuItem',
  (subMenuItem) => {
    cy.getMenu().hoverParentMenuItem(subMenuItem)
    cy.getMenu().clickSubMenuItem(subMenuItem)
  },
  /* {
      validate: (subMenuItem) => {
        console.log(
          'navigateToSubMenuItem:validate',
          { subMenuItem },
          cy.location('href')
        )
        expect(cy.location('href')).to.contain(subMenuItem.path)
        // cy.location('href').should('eq', subMenuItem.path);
      }
    } */
)

Cypress.Commands.add('openUploadImageDialog', () => {
  cy.contains('span', 'Upload Image', {
    timeout: 50000,
  })
  .should('not.have.class', 'disabled', { timeout: 50000 })
  .click()

  Cypress.log({
    name: 'afterClickActionRegistered',
    displayName: 'setSS',
    message: 'click action registered',
    consoleProps: () => {
      return {
        'log ret val': 'car',
      }
    },
  })
})

Cypress.Commands.add('selectImage', () => {
  // cy.get('.uploadcare--button.uploadcare--button_size_big.uploadcare--button_primary.uploadcare--tab__action-button.needsclick.uploadcare--dragging__hide', {
  //   timeout: 10000,
  // }).selectFile({ path: 'cat_crt.png', type: 'image/png' })

  // cy.fixture('cat_crt.png', 'base64').then((fileContent) => {
  //   cy.get('.uploadcare--button.uploadcare--button_size_big.uploadcare--button_primary.uploadcare--tab__action-button.needsclick.uploadcare--dragging__hide').attachFile(
  //     {
  //       fileContent,
  //       fileName: 'cat_crt.png',
  //       mimeType: 'image/png',
  //       encoding: 'base64',
  //     },
  //     { subjectType: 'input' },
  //   )
  // })

  //Check file uploading with drag-drop
  cy.get('.uploadcare--draganddrop_supported').selectFile('cat_crt.png', {
    action: 'drag-drop',
  }).then(() => {
    cy.log('File selected successfully')
  })

  //Check if image was loaded successfully
  cy.get('.uploadcare--media__image.uploadcare--preview__image', {
    timeout: 5000,
  })
  .should('exist')

  //Check Done Button
  cy.get('.uploadcare--button.uploadcare--button_primary.uploadcare--footer__button.uploadcare--preview__done', {
    timeout: 5000,
  })
  .then(($button) => {
    cy.wrap($button).click()
    cy.log('Done Button clicked successfully')
  })
})

Cypress.Commands.add(
  'discountCalculator',
  (quantity) => {
    let discount

    cy.get('.adp-discount-table tbody tr')
    .then(($rows) => {
      const rows = $rows.toArray()

      if (quantity < parseInt(Cypress.$(rows[0]).find('td').first().text())) return '0'

      for (let i = 0; i < rows.length; i++) {
        const rowQuantity = parseInt(Cypress.$(rows[i]).find('td').first().text())

        if (quantity < rowQuantity) break

        discount = Cypress.$(rows[i]).find('td').eq(1).text()
      }
    }).then(() => {
      cy.log(`Discount for quantity ${quantity} is: ${discount}`)

      return discount
    })
  },
)

Cypress.Commands.add(
  'testCart',
  (variations, size, quantity, price) => {
    let discountedPrice = ((parseFloat(price)) * (1 - 0.15)).toFixed(2)

    cy.get('#recart-root', { timeout: 30000 })
    .then(($el) => {
      if ($el.find('.recart-popup-container-lightbox-desktop.with-additional-image.right.recart-popup-custom-wrapper').length > 0) {
        cy.get('.recart-popup-container-lightbox-desktop.with-additional-image.right.recart-popup-custom-wrapper', { timeout: 30000 })
          .first()
          .then(($matchedElement) => {
            cy.get('.recart-popup-custom-close').click()
            // Add your logic here for when the element exists
          })
      }
    })

    cy.get('.slide-cart-body', { timeout: 10000 })
    .find('.cart-item', { timeout: 10000 }).first().as('newItem')
    .find('.cart-title', { timeout: 10000 }).should('have.text', variations)
    .then(() => {
      cy.get('@newItem', { timeout: 10000 })
      .then(($el) => {
        cy.wrap($el).find('.cart-variant-item', { timeout: 50000 }).contains('strong', 'width')
        .siblings('span')
        .invoke('text').should('include', size.width)
        .then(() => {
          cy.log('Width is correct')
        })
      })

      cy.get('@newItem', { timeout: 10000 })
      .then(($el) => {
        cy.wrap($el).find('.cart-variant-item', { timeout: 50000 }).contains('strong', 'height')
        .siblings('span')
        .invoke('text').should('include', size.height)
        .then(() => {
          cy.log('Height is correct')
        })
      })

      cy.get('@newItem', { timeout: 10000 })
      .find('.quantity', { timeout: 10000 }).should('have.text', quantity)
      .then(() => {
        cy.log('Quantity is correct')
      })

      cy.get('@newItem', { timeout: 10000 })
      .find('img', { timeout: 10000 })
      .invoke('attr', 'data-srcset')
      .then((attr) => {
        if (attr.includes('crop')) {
          cy.log('Image was loaded on cart')
        } else {
          cy.fail('Image was not loaded on cart')
        }
      })

      cy.get('.slide-cart-footer', { timeout: 10000 })
      .find('span.text-money', { timeout: 10000 }).invoke('text')
      .should('include', discountedPrice)
      .then(() => {
        cy.log('Price is correct')
      })
    })
    .then(() => {
      cy.get('#slidecart_agree', { timeout: 10000 }).click()
      .then(() => {
        cy.log('Agree check box was checked.')
      })
    })
    .then(() => {
      cy.get('.submit-button.text-uppercase.text-white', { timeout: 10000 }).click()
      .then(() => {
        cy.log('Check out button was clicked.')
      })
    })
  },
)

Cypress.Commands.add(
  'testCheckOut',
  (variations, size, price) => {
    let discountedPrice = ((parseFloat(price)) * (1 - 0.15)).toFixed(2)

    cy.get('div[role="table"][aria-labelledby="ResourceList0"]', { timeout: 10000 })
    .find('div[role="row"]', { timeout: 10000 }).eq(1)
    .then(($el) => {
      cy.wrap($el)
      .find('div[role="cell"]', { timeout: 10000 }).eq(1)
      .find('p').first().invoke('text')
      .should('include', variations)
      .then(() => {
        cy.log('Variation is correct in check out.')
      })
    })

    cy.get('div[role="table"][aria-labelledby="ResourceList0"]', { timeout: 10000 })
    .find('div[role="row"]', { timeout: 10000 }).eq(1).as('newItemInCheckOut')
    .find('li', { timeout: 10000 }).contains('span', 'width').invoke('text')
    .should('include', size.width)
    .then(() => {
      cy.log('Width is correct in check out.')
    })

    cy.get('@newItemInCheckOut', { timeout: 10000 })
    .find('li', { timeout: 10000 }).contains('span', 'height').invoke('text')
    .should('include', size.height)
    .then(() => {
      cy.log('Height is correct in check out.')
    })

    cy.get('div[role="table"][aria-labelledby="MoneyLine-Heading0"]', { timeout: 10000 })
    .contains('strong', '$')
    .then(($el) => {
      cy.wrap($el).invoke('text')
      .should('include', discountedPrice)
    })
    .then(() => {
      cy.log('Price is correct in check out.')
    })
  },
)
