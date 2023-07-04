const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
  },
  projectId: 'n54w4o',
  env: {
    MENU_ITEMS: {
      customSizePlaymat: {
        path: 'products/custom-size-playmat',
        label: 'Custom Size Playmat',
        parentMenuItemLabel: 'Playmats',
      },
      stainedGlass100DeckBox: {
        path: 'products/stained-glass-deck-box',
        label: 'STAINED GLASS 100+ DECK BOX',
        parentMenuItemLabel: 'Deck Box',
      },
    },
    PREVIEW_THEME_ID: '154027557180',
  },
})
