/** 项目名称 */
const ProjectName = 'x_template';

/** y3项目的路径 */
let Y3ProjectPath = "E:/Game/game/LocalData/DemoLua1"

/** 验证配置是否合法 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');
assert(
    ProjectName.match(/^[a-zA-Z0-9_]*$/),
    'ProjectName 只能包含字母、数字和下划线，请到 ProjectCopnfig.js 修改'
);
assert(
    ProjectName !== 'y3TsTemplate',
    '请到 ProjectCopnfig.js 修改 ProjectName 为你的项目名称，不能为 y3TsTemplate'
);
const scriptPath = path.join(Y3ProjectPath,"script")
assert(
    fs.existsSync(scriptPath),
    '请到 ProjectCopnfigaddon 修改 Y3ProjectPath 为项目所在路径'
);

module.exports = {
    ProjectName,
    Y3ProjectPath,
};
