import multer from 'multer'
import path from 'node:path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // si es avatar de usuario
    if (file.fieldname === 'avatar') {
      cb(null, path.join(__dirname, '..', 'public', 'uploads'))
    }
    // si es imagen de producto
    else if (file.fieldname === 'image') {
      cb(null, path.join(__dirname, '..', 'public', 'images'))
    }
    else {
      cb(new Error('Invalid fieldname'))
    }
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`
    cb(null, filename)
  }
})

const upload = multer({ storage })

export default upload;