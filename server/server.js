const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));


function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min);
}

// number need to be guessed
let random = randomNumber(1, 25)

// comparison function


// GET & POST Routes go here
app.post('/', (req, res)=>{
  console.log(req.body);
  let arr = [];

  if(req.body.guess1 == random){
    console.log('correct');
    arr.push({
      update:"correct",
      guesser: 'guesser1'
    })
  } else if (req.body.guess2 == random) {
    console.log('correct');
    arr.push({
      update:"correct",
      guesser: 'guesser2'
    })

  } else {
    console.log('incorrect')
    if(req.body.guess1 > random) {
      console.log('your guess is greater')
      arr.push({
        update:"higher",
        guesser: 'guesser1'
      })
    } else {
      console.log('your guess is lower')
      arr.push({
        update:"lower",
        guesser: 'guesser1'
      })
    }

    if(req.body.guess2 > random) {
      console.log('your guess is greater')
      arr.push({
        update:"higher",
        guesser: 'guesser2'
      })
    }
    else{
      console.log('your guess is lower');
      arr.push({
        update:"lower",
        guesser: 'guesser2'
      })
    }

  }

  app.post('/generate', (req, res)=>{
    random = req.body.num;
    console.log(random);
  })
  console.log(random);
  console.log(arr);
  // ['guess1' ,'guess2']

  res.send(arr);
});


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
