const express = require('express');
const cors = require('cors');
const app = express();
const port= 4000;
const multer = require('multer');

const storage = multer.diskStorage({
    destination:'./uploads',
    filename: function(req, file, cb){
        console.log(file)
        cb(null, Date.now()+'.' + file.mimetype.split('/')[1])
    }
})
const upload = multer({storage: storage})
app.use(cors());

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req);
    if (req.file) {
        res.status(200).json({ filename: req.file.filename });
    } else {
        res.status(400).json({ error: 'File upload failed.' });
    }
});

app.listen(port, () => console.log(`listening on port ${port}`));