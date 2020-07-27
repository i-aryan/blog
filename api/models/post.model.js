const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var d = new Date();

function getMonthName(num){
    switch(num){
        case 1: return 'Jan';
        case 2: return 'Feb';
        case 3: return 'March';
        case 4: return 'April';
        case 5: return 'May';
        case 6: return 'June';
        case 7: return 'July';
        case 8: return 'Aug';
        case 9: return 'Sep';
        case 10: return 'Oct';
        case 11: return 'Nov';
        case 12: return 'Dec';
    }
}

let Post = new Schema({
    post_title: {
        type:String,
        required: true
    },
    post_summary:{
        type: String,
        default: ' '
    },
    post_content:{
        type:String,
        required:true
    },
    post_date:{
        type: String,
        default: d.getDate() + ' ' + getMonthName(d.getMonth()) + ', '+  d.getFullYear()
    },
    post_image:{
        type: String
    }
});

module.exports = mongoose.model('Post', Post);