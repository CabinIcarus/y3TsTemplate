const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');
const config = require("../ProjectCopnfig");

(async () => {
    const projectName = config.ProjectName;
    const y3ProjectPath = config.Y3ProjectPath;

    for (const directoryName of ['src']) {
        const sourcePath = path.resolve(__dirname, '..', directoryName);
        assert(fs.existsSync(sourcePath), `Could not find '${sourcePath}'`);

        const targetRoot = path.join(y3ProjectPath);
        assert(fs.existsSync(targetRoot), `Could not find '${targetRoot}'`);

        if (fs.existsSync(targetRoot)) {

            const targetPath = targetRoot;

            const isCorrect = fs.lstatSync(sourcePath).isSymbolicLink() && fs.realpathSync(sourcePath) === targetRoot;
            if (isCorrect) {
                console.log(`Skipping '${sourcePath}' since it is already linked`);
                continue;
            }
            else {
                // 移除目标文件夹的所有内容，
                console.log(`'${targetPath}' is already linked to another directory, removing`);
                fs.chmodSync(targetPath, '0755');
                rimraf(targetPath, () => {
                    console.log('removed target path');
                    console.log(`Repaired broken link ${sourcePath} <==> ${targetRoot}`);
                    fs.symlinkSync(targetRoot, sourcePath, 'junction');
                    console.log(`Repaired broken link ${sourcePath} <==> ${targetRoot}`);
                });
            }
        }
    }
})().catch(error => {
    console.error(error);
    process.exit(1);
});
