const express = require("express");
const path = require("path");
const fileUpload = express.Router();
const multer = require("multer"); // multer


//<-------------- File Roles -------------->
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/data'); //파일 저장 경로
    },
    filename: (req, file, cb) => {
        const fileType = file.mimetype.split('/')[1];
        cb(null, `${Date.now()}.${fileType}`); //파일 이름
    }
});

const fileFilter = (req, file, cb) => {
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1];

    if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif' || fileType == 'webp') {
        req.fileValidationError = null;
        cb(null, true);
    } else {
        req.fileValidationError = "jpg, jpeg, png, gif, webp 파일만 업로드 가능합니다.";
        cb(null, false)
    }
}
//<-------------- File Roles -------------->

const upload = multer({
    storage : storage,
    fileFilter : fileFilter,
    limits: { 
        fileSize: 10 * 1024 * 1024 //크기 제한 : 10MB
    }
});   

//profile은 폼데이터 속성 및 input태그 name 속성 값
//복수의 파일 업로드시 single대신 array(fieldname[, maxCount]) 형태로 사용
fileUpload.post('/upload/profile', upload.single('profile'), async (req, res)=> {
    if(req.fileValidationError === null){
        console.log("업로드 성공");
        console.log(req.file);
        // res.status(200).send("ok");
        res.sendFile(path.join(__dirname, `../${req.file.path}`));
    }else{
        console.log(req.fileValidationError);
        res.status(404).send('fail');
    }
});


module.exports = fileUpload;