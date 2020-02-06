const fs= require('fs');
const { spinner } = require('../utils/spinner')
const chalk = require('chalk')

function _copy (dirPath, dirName) {
  const paths = fs.readdirSync(dirPath)
  paths.forEach(function (pathName) {
    if(pathName === 'node_modules'){
      return ;
    }
    const currentDirPath = dirPath + '/' + pathName
    const currentFileName = dirName + '/' + pathName
    const stat = fs.statSync(currentDirPath)
    if (stat.isFile()) {// 判断是文件还是目录
      fs.writeFileSync(currentFileName, fs.readFileSync(currentDirPath))
      spinner.succeed(currentFileName + ' file generated successfully!')
    } else if (stat.isDirectory()) {
      copyDir(currentDirPath, currentFileName)// 当是目录是，递归复制
    }
  })
}
function copyDir (dirPath, dirName) {
  const isExist = fs.existsSync(dirName)
  if (!isExist) {
    fs.mkdirSync(dirName)//创建目录
    spinner.succeed(dirName + ' directory generated successfully!')
  }else {
    spinner.fail(chalk.red(dirPath + ' directory is exist!!'))
    return ;
  }
  _copy(dirPath, dirName)
}
module.exports = {
  copyDir: copyDir
}
