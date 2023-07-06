import 'cypress-file-upload'
import '@testing-library/cypress/add-commands'
import 'cypress-xpath'

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
