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
    timeout: 10000,
  })
      .should('not.have.class', 'disabled')
      .click()

  Cypress.log({
    name: 'afterClickActionRegistered',
    // shorter name for the Command Log
    displayName: 'setSS',
    message: 'click action registered',
    consoleProps: () => {
      // return an object which will
      // print to dev tools console on click
      return {
        'log ret val': 'car',
      }
    },
  })
})

Cypress.Commands.add('selectImage', () => {
  cy.openUploadImageDialog()
  cy.get('.uploadcare--draganddrop_supported').selectFile('cat_crt.png', {
    action: 'drag-drop',
  })

  cy.get('.uploadcare--media__image.uploadcare--preview__image', {
    timeout: 10000,
  })
  .should('be.visible')
  .and('have.prop', 'naturalWidth')
  .should('be.greaterThan', 0)
})
