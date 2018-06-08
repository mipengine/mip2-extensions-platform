/**
 * @file build.js build all project
 * @author tracy(qiushidev@gmail.com)
 */

const path = require('path')
const fs = require('fs')
const execa = require('execa')
const async = require('async')

const projects = fs.readdirSync(path.join(__dirname, 'sites')).filter(file => {
  return fs.statSync(path.join(__dirname, 'sites', file)).isDirectory()
})

if (projects.length < 1) {
  console.log('ERR: No mip site found')
  return
}

const build = function (proj, done) {

  let src = path.join(process.cwd(), 'sites', proj)
  let dist = path.join(process.cwd(), 'dist', proj)
  let publicPath = 'https://c.mipcdn.com/static/v2/' + proj;

  execa('mip2', ['build', '--dir', src, '--output', dist, '--asset', publicPath, '--clean'])
  .then(res => {
    done()
  })
}

console.log('Building... Please wait')

async.each(projects, build, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('All projects has been build successfully!')
  }
})
