var request = require('request');   // install request module by - 'npm install request'
var fs = require('fs');
var files = fs.readdirSync('./test_photos/');

const form_data = {
  file: fs.createReadStream('./test_photos/pedestrian_crowd.jpg'),
};

const options = {
    url : "https://app.nanonets.com/api/v2/ObjectDetection/Model/2cfab12f-b14c-4220-be31-35a41c57c505/LabelFile/",
    formData: form_data,
    headers: {
        'Authorization' : 'Basic ' + Buffer.from('NzaCGlGPrClsG27jqCF795JKLAXTuBHB' + ':').toString('base64')
    }
};
request.post(options, function(err, httpResponse, body) {
    res = JSON.parse(body);
    numIdentifiedObjects = res.result[0].prediction.length;
    peopleFound = 0;
    for (i = 0; i < numIdentifiedObjects; i++){
        if (res.result[0].prediction[i].label === 'person'){
            peopleFound = 1 + peopleFound;
        }
    }
    return peopleFound;
});


