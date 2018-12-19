const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res){
    let firstName = req.body.fn;
    let lastName = req.body.ln;
    let email = req.body.email;
    let data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    let jsonData = JSON.stringify(data);

    let options = {
        url: 'https://us7.api.mailchimp.com/3.0/lists/30531f99cd',
        method: 'POST',
        headers: {
            'Authorization': 'andy1 0117501d5c2d28d466afc8e1bbd69c82-us7'
        },
        body: jsonData,
    };

    request(options, function(error, response, body){
        if (error){
            res.sendFile(__dirname + '/failure.html');
        }else {
            console.log(response.statusCode);
            if (response.statusCode === 200){
                res.sendFile(__dirname + '/success.html');
            }else{
                res.sendFile(__dirname + '/failure.html');
            }
        }
    });

});


app.post('/failure', function(req, res){
    res.redirect('/');
});


app.listen(process.env.PORT || 3000, function(){
    console.log('Server is running');
});



//API Key
// 0117501d5c2d28d466afc8e1bbd69c82-us7

//List Id 
// 30531f99cd
