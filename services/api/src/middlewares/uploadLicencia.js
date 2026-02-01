import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadPath = 'uploads/licencias'

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, uploadPath)
    },
    filename: (_, file, cb) => {
        const ext = path.extname(file.originalname)
        const name = `licencia-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
        cb(null, name)
    }
})

const fileFilter = (_, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Solo se permiten imágenes JPG o PNG'))
    }
}

export const uploadLicenciaImage = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
})