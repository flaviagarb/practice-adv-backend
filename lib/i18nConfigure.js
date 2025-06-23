import i18n from 'i18n'
import path from 'node:path'

i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(process.cwd(), 'lang'),
  defaultLocale: 'en',
  cookie: 'nodepop-lang',
  autoReload: true,
  syncFiles: true
})

export default i18n