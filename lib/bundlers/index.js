function dev(options) {
  process.env.NODE_ENV = 'development'
  start(options)
}

function build(options) {
  process.env.NODE_ENV = 'production'
  console.log(process.env.NODE_ENV)
  if (options.bundler === 'nollup') options.bundler = 'rollup'
  start(options)
}

function start(options) {
  const bundlers = {
    nollup: () => require('./rollup/nollup').startNollup,
    rollup: () => require('./rollup/rollup').startRollup,
    vite: () => require('./vite/vite').startVite,
    snowpack: () => require('./snowpack/snowpack').startSnowpack
  }

  const bundler = bundlers[options.bundler]()
  bundler(options)
  startRoutify(options)
}

function startRoutify(_options) {
  const options = {
    routifyDir: '_roxi/.routify',
    dynamicImports: true,
    singleBuild: process.env.NODE_ENV === 'production',
    plugins: {
      [`${__dirname}/../shared/routify-plugins/routifyToRoxi.js`]: {}
    }
  }

  require(`@sveltech/routify/lib/services/interface`).start(options)
}




module.exports = { dev, build }
