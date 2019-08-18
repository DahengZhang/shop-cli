const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')

module.exports = async (projectName, options) => {
    // 读取基本配置文件
    let tplPackage = require(`${__dirname}/../template/package.json`)
    // let tplWebpackConf = require(`${__dirname}/../template/webpack.config.js`)
    const { css, name, router } = await inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: '请输入项目名称',
            default: projectName === '.' ? path.relative('../', process.cwd()) : projectName
        }, {
			name: 'css',
			type: 'list',
			message: `选择css预处理器`,
			choices: [
				{ name: '不使用', value: false},
                { name: 'less', value: 'less-template'},
                { name: 'sass/scss', value: 'sass-template'}
			]
		}, {
            name: 'router',
            type: 'confirm',
            message: '是否使用路由',
            default: true
        }, {
            name: 'hash',
            type: 'confirm',
            message: '路由使用hash模式',
            default: false,
            when (answer) {
                return answer.router
            }
        }
    ])

    // 修改项目名称
    tplPackage.name = name
    // 添加css预处理器
    if (css) {
        // 读取预处理器配置文件
        const cssPackage = require(`${__dirname}/../template/${css}/package.json`)
        // 就该基础配置文件
        tplPackage.devDependencies = Object.assign(tplPackage.devDependencies, cssPackage.devDependencies)
    }
    // 添加路由依赖
    if (router) {
        // 读取路由配置文件
        const routerPackage = require(`${__dirname}/../template/router-template/package.json`)
        tplPackage.dependencies = Object.assign({}, tplPackage.dependencies, routerPackage.dependencies)
    }
    // 写入到 package 文件
    fs.writeFileSync(`${process.cwd()}/package-project.json`, JSON.stringify(tplPackage, null, 2), 'utf-8')
}
