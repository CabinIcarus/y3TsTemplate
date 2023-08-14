const assert = require("assert");
const fs = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');
const config = require("../ProjectCopnfig");

(async () => 
{
    const projectName = config.ProjectName;
    const y3ProjectPath = config.Y3ProjectPath;

    const sourceRootPath = path.resolve(__dirname, '..', "Scripts");
    assert(fs.existsSync(sourceRootPath), `Could not find '${sourceRootPath}'`);
    
    const sourcePath = path.join(sourceRootPath,"Ts");
    const sourceLinkPath = path.join(sourceRootPath,"Lua");

    for (const dir of [sourcePath, sourceLinkPath]) 
    {
        if (!fs.existsSync(dir))
        {
            fs.mkdirs(dir);
        }
    }

    assert(fs.existsSync(y3ProjectPath), `Could not find '${y3ProjectPath}'`);
    
    const targetLinkPath = path.join(y3ProjectPath, "script")

    const isCorrect = fs.lstatSync(sourceLinkPath).isSymbolicLink() && fs.realpathSync(sourceLinkPath) === targetLinkPath;

    if (isCorrect)
    {
        console.log(`Skipping '${sourceLinkPath}' since it is already linked`);
    }
    else 
    {
        // 移除目标文件夹的所有内容，
        console.log(`'${sourceLinkPath}' is already linked to another directory, removing`);
        //https://chmodcommand.com/chmod-755/
        fs.chmodSync(sourceLinkPath, '0755');
        rimraf(sourceLinkPath, () => 
        {
            console.log('removed target path');
            fs.moveSync(targetLinkPath, sourceLinkPath);
            fs.symlinkSync(sourceLinkPath, targetLinkPath, 'junction');
            console.log(`Repaired broken link ${targetLinkPath} <==> ${sourceLinkPath}`);
        });
    }
})().catch(error => {
    console.error(error);
    process.exit(1);
});
