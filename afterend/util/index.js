module.exports = {
    updata(req) {
        return new Promise((reslove, reject) => {
            const formidable = require("formidable");
            const path = require("path");
            let form = new formidable.IncomingForm({
                uploadDir: path.resolve(process.cwd(), "./static"),  // 上传文件存储的路径
                keepExtensions: true   // 保持之前上传文件的后缀名称
            });
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    reject(err);
                    return console.log(err);
                }
                reslove({ ...fields, imgs: files.imgs.newFilename })
            })
        })
    }
}
