const inquirer = require('inquirer')
const questions = [{
    type: 'input',
    name: 'input',
    message: '输入测试'
}, {
    type: 'number',
    name: 'number',
    message: '数字输入测试',
    default: 2
}, {
    type: 'confirm',
    name: 'confirm',
    message: '是否测试',
    default: true
}, {
    type: 'list',
    name: 'list',
    message: '单选测试',
    choices: [1, 2, 3, 4, 5]
}, {
    type: 'rawlist',
    name: 'rawlist',
    message: '带序列号单选测试',
    choices: [1, 2, 3, {
        name: '4',
        value: 4
    }, 5]
}, {
    type: 'expand',
    name: 'expand',
    message: '输入型单选',
    choices: [{
        key: 'a',
        name: 'a-name1',
        value: 'key-a-0'
    }, {
        key: 'b',
        name: 'b-name2',
        value: 'key-b-1'
    }, {
        key: 'c',
        name: 'c-name3',
        value: 'key-c-2'
    }, {
        key: 'd',
        name: 'd-name4',
        value: 'key-d-3'
    }, {
        key: 'e',
        name: 'e-name5',
        value: 'key-e-4'
    }]
}, {
    type: 'checkbox',
    name: 'checkbox',
    message: '多选测试',
    choices: [1, 2, 3, 4, 5],
    pageSize: 4,
    when (v) {
        return v.confirm ? true : false
    }
}, {
    type: 'password',
    name: 'password',
    message: '密码测试'
},
// {
//     type: 'editor',
//     name: 'editor',
//     message: 'vim测试'
// }
]

module.exports = async () => {
    const answer = await inquirer.prompt(questions)

    console.log(answer)
}