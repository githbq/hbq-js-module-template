
import babel from 'rollup-plugin-babel'
import banner from 'rollup-plugin-license'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import { version } from './package.json'
import nodeResolve from "rollup-plugin-node-resolve"

// eslint-disable-next-line
console.log(`准备构建 any@${version} 
构建完成后请使用example/index.html进行测试，并将生成的文件提交到Git仓库。`)

const moduleName = 'moduleName'

function getConfig (options) {
  const config = {
    input: 'index.js',
    output: {
      format: 'umd',
      file: `./releases/${moduleName}-${version}${options.debug ? '.debug' : ''}.js`,
      name: moduleName, 
      intro: `var __DEBUG_MODE__ = ${options.debug}`
    },
    plugins: [
      babel({
        exclude: /node_modules/,
        runtimeHelpers: true,
      }),
      nodeResolve(),
      commonjs(),
      options.debug ?
        () => { }
        : uglify({
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false
          }
        }),
      banner({
        banner: `/*!
* ${moduleName}@${version}
* (c) 2018-${new Date().getFullYear()} github.com
*/`
      })
    ]
  }

  return config
}

const config = [
  getConfig({ debug: false }),
  getConfig({ debug: true })
]

export default config
