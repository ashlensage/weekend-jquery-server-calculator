const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
const history = [];

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
app.get('/history', (req, res)=>{
  res.send({history});
});

app.post('/calculate', (req, res)=>{
  const {
    operator,
    firstNumber,
    secondNumber
  } = req.body;
  const num1 = parseInt(firstNumber);
  const num2 = parseInt(secondNumber);
  let result = 0;
  let operatorSymbol = '';
  console.log(req.body);
  switch (operator) {
    case 'add':
      result = num1 + num2;
      operatorSymbol = '+';
      break;
    case 'subtract':
      result = num1 - num2;
      operatorSymbol = '&minus;';
      break;
    case 'multiply':
      result = num1 * num2;
      operatorSymbol = '&times;'
      break;
    case 'divide':
      result = num1 / num2;
      operatorSymbol = '&divide;';
      break;
    default:
      console.log('opperator error');
  }  
  history.push({
    operator: operatorSymbol,
    firstNumber: num1,
    secondNumber: num2,
    result
  });
  res.send({result});
});

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
});
