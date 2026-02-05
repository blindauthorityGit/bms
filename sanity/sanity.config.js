import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import deskStructure from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'body-mind-soul',

  projectId: 'rs5t3rus',
  dataset: 'production',

 plugins: [
    structureTool({
      structure: deskStructure, // <-- hier einhängen
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})




