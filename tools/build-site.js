/**
 * @file build.js build and generate preview page
 * @author chenqiushi
 */

const path = require('path')
const async = require('async')
const fs = require('fs-extra')
const glob = require('glob')
const execa = require('execa')
const rootDir = path.join(__dirname, '..')

// 编译，结束后生成预览站点
buildComponents()

function buildComponents () {
  const projects = fs.readdirSync(path.join(rootDir, 'sites')).filter(file =>
    fs.statSync(path.join(rootDir, 'sites', file)).isDirectory()
  )

  if (projects.length < 1) {
    console.log('ERR: No mip site found')
    return
  }

  const build = function (proj, done) {
    let src = path.join(rootDir, 'sites', proj)
    let dist = path.join(rootDir, 'dist', proj)
    let publicPath = '/' + proj

    let options = ['build', '--dir', src, '--output', dist, '--asset', publicPath, '--clean']
    execa('mip2', options)
      .then(res => {
        done()
      })
      .catch(err => {
        console.log(err)
        process.exit(1)
      })
  }

  console.log('Building... Please wait')

  async.each(projects, build, err => {
    if (err) {
      console.log(err)
      throw err
    } else {
      console.log('All sites has been build successfully!')
      genPreviewPage()
    }
  })
}

function genPreviewPage () {
  const dist = path.resolve(rootDir, 'dist')
  const examplesPath = path.resolve(dist, 'examples')

  if (!fs.existsSync(dist)) {
    console.log('dist not found')
    return
  }

  console.log('start to generate preview page..')

  // 把各个站点的 example 目录文件移动到 dist/examples，维持站点-组件层级
  glob.sync('sites/*/components/mip-*/example/*.*', {realpath: true})
    .forEach(file => {
      let reg = file.match(/sites\/(.+)\/components\/(mip-.+)\/example/)
      let destPath = path.join(dist, 'examples', reg[1], reg[2], path.basename(file))
      fs.copySync(file, destPath)
    })

  // 进行站点、组件分类、替换等
  let componentListDom = []

  fs.readdirSync(examplesPath).forEach(site => {
    fs.readdirSync(path.join(examplesPath, site)).forEach((comp, index) => {
      // example dir may contains multiple pages
      let examplePaths = []
      glob.sync('*.html', {cwd: path.resolve(examplesPath, site, comp)})
        .forEach(file => {
          let htmlEgPath = path.join('examples', `${site}/${comp}/${file}`)
          examplePaths.push(htmlEgPath)

          // 替换组件 js 引用路径，加上 site 前缀
          let curFile = path.resolve(examplesPath, site, comp, file)
          let result = fs.readFileSync(curFile, 'utf8').replace(/(src="\/)(mip-(.+)\/mip-(.+).js")/g, `$1${site}/$2`)
          fs.writeFileSync(curFile, result, 'utf8')
        })

      const exampleLinksDom = examplePaths.map(path => `<a href="${path}" target="_blank">示例</a>`).join('')
      let siteTitle = index === 0 ? `<h2>${site}</h2>` : ''
      componentListDom.push(`${siteTitle}<li><b>${comp}</b><a href="${path.join(site, comp, `${comp}.js`)}" target="_blank">源码</a>${exampleLinksDom}</li>`)
    })
  })

  const htmlTemplate = `
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
      <meta charset="UTF-8">
      <title>MIP 2.0 组件列表</title>
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
      <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0">
      <style>a{margin-left: 10px;}</style>
  </head>
  <body>
      <h1>MIP 组件列表</h1>
      <ul>
          ${componentListDom.join('')}
      </ul>
  </body>
  </html>
  `

  // generate html file
  fs.writeFileSync(path.join(dist, 'index.html'), htmlTemplate)
  console.log('static page generated!')
}
