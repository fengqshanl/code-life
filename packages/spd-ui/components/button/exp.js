import util from '../../utils/basic'
const button = {
    name: '按钮',
    component: 'spd-button',
    desc: 'el-button 二次封装的 button 按钮',
    method: {
        click() {}
    }
}

export default util.mergeBasicMethod(button)
