import mongoose from 'mongoose';


const UrlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
   
   
}, { timestamps: true });

const URL = mongoose.models.URL || mongoose.model('URL', UrlSchema);

export default URL;
