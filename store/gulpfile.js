const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const path = require('path')

// Caminhos dos arquivos SCSS e destino do CSS
const scssFiles = './styles/scss/**/*.scss'
const cssDest = './styles/css'

// Função para compilar um único arquivo SCSS
function compileSingleFile(filePath) {
  // Extrai o caminho relativo do arquivo modificado
  const relativePath = path.relative(
    path.resolve('styles/scss'),
    path.dirname(filePath)
  )

  return gulp
    .src(filePath) // Somente o arquivo alterado
    .pipe(
      sass().on('error', function (err) {
        console.error('Erro de compilação do SASS:', err.message)
        this.emit('end')
      })
    )
    .pipe(gulp.dest(path.join(cssDest, relativePath))) // Salva o CSS mantendo a estrutura
    .on('end', () => console.log(`Compilado: ${filePath}`))
}

// Função para compilar todos os arquivos SCSS
function compileAll() {
  return gulp
    .src(scssFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssDest))
    .on('end', () => console.log('Todos os arquivos SCSS foram compilados.'))
}

// Função para monitorar mudanças nos arquivos SCSS
function watch() {
  gulp
    .watch(scssFiles, function (cb) {
      compileAll()
      cb()
    })
    .on('change', function (filePath) {
      console.log(`Arquivo modificado: ${filePath}`)
      compileSingleFile(filePath)
    })
}

// Exporta as tarefas do Gulp
exports.compileAll = compileAll
exports.watch = watch
