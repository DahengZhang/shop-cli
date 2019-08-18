const path = require('path')
const ora = require('ora')
const clone = require('download-git-repo')
const { execSync } = require('child_process')

module.exports = async (options) => {
    const spinner = ora('正在下载组件...').start()
    execSync(`rm -rf ${path.join(__dirname, '../tmp')}`)
    clone(
        `direct:git@github.com:DahengZhang/daheng-cli.git#simple-template`, path.join(__dirname, '../tmp'), { clone: true }, function(err) {
            if (err) {
                // 下载失败
                spinner.text = '下载失败'
                spinner.fail()
                return
            }
            // 下载成功
            spinner.text = '下载成功'
            spinner.succeed()
            execSync(`cp -r ${path.join(__dirname, '../tmp/src')} ${process.cwd()}`)
            ora('组件更新成功').succeed()
        }
    )
}
