const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const path = require('path')

const scssFiles = './styles/scss/**/*.scss'
const cssDest = './styles/css'

function compileSingleFile(filePath) {
  // Extrai o nome do diretório relativo do arquivo modificado
  const relativePath = path.relative(
    path.resolve('styles/scss'),
    path.dirname(filePath)
  )

  return gulp
    .src(filePath) // Somente o arquivo alterado
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(cssDest, relativePath))) // Salva o CSS mantendo a estrutura
}

function watch() {
  gulp.watch(scssFiles).on('change', function (filePath) {
    console.log(`Arquivo modificado: ${filePath}`)
    compileSingleFile(filePath) // Compila somente o arquivo modificado
  })
}

exports.watch = watch
exports.mount = watch
