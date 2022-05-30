const express = require('express');
const app = express();

const operators = ['+', '-', '*', '/'];


const operator = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y
};

app.use(express.json())

app.post('/api/calculator', (req, res) => {  
    const msg = req.body.msg;
    if(!msg){
        return res.send({message: 'Invalid Data'});
    }

    let data = msg.text;
    if (data) {
        let op = operators.find((o, i) => {
            if (data.includes(o)) {
                return true
            }
        })
        if (op) {
            let arr = data.split(op);
            if (arr[0] && arr[1]) {
                let a = Number(arr[0]);
                let b = Number(arr[1]);

                if ((a || a === 0) && (b || b === 0)) {
                    const output = operator[op](a, b);
                    return res.send({message: `Result: ${output}`});                    
                }
            }
        }
    }
    return res.send({message:  `Hi ${msg.from.first_name} ${msg.from.last_name}. \n Please enter numbers and symbol to perform arthmetic operation. \n Ex: 10 + 20`})
})

app.listen(5000, function () {
    console.log('listening on 5000')
})