const inquirer = require('inquirer')
const Rx = require('rxjs')

const questions = [{
    name: 'css',
    type: 'list',
    message: `选择css预处理器`,
    choices: [
        { name: '不使用', value: false},
        { name: 'less', value: 'less-template'},
        { name: 'sass/scss', value: 'sass-template'}
    ]
}, {
    name: 'hash',
    type: 'confirm',
    message: '是否使用hash模式',
    default: false
}, {
    name: 'router',
    type: 'confirm',
    message: '是否使用路由',
    default: false
}]

let nowQuestion = 0

const answer = () => {
    const prompts = new Rx.Subject()
    inquirer.prompt(prompts).ui.process.subscribe(function(res) {
        if (nowQuestion < questions.length) {
            answer()
        } else {
            prompts.complete()
        }
    })
    prompts.next(questions[nowQuestion])
    nowQuestion++
}

module.exports = async (name, cmd) => {
    answer()
}