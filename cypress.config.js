const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      // implement node event listeners here
    },
  },
  projectId: 'n54w4o',
  env: {
    menuItems: {
      customSizePlaymat: {
        path: 'products/custom-size-playmat',
        label: 'Custom Size Playmat',
        parentMenuItemLabel: 'Playmats',
      },
    },
  },
})
