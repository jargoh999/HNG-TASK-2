const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

async function getFunFact(number) {
    try {
        const response = await fetch(`http://numbersapi.com/${number}/math`);
    if (!response.ok) {
            throw new Error(`Numbers API error: ${ response.status }`);
        }
        const fact = await response.text();
        return fact.trim(); 
    } catch (error) {
        console.error("Error fetching fun fact:", error);
        return "Fun fact unavailable at the moment.";
    }
}

function classifyNumber(number) {
   

    const num = parseInt(number); 

    const is_prime = isPrime(num);
    const is_perfect = isPerfect(num);
    const properties = getProperties(num);
    const digit_sum = sumDigits(num);

    return {
        number: num,
        is_prime,
        is_perfect,
        properties,
        digit_sum,
        fun_fact: "", 
    };
}

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function isPerfect(num) {
    if (num <= 1) return false;
    let sum = 1;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            sum += i;
            if (i * i !== num) sum += num / i;
        }
    }
    return sum === num;
}

function getProperties(num) {
    const props = [];
    if (isArmstrong(num)) props.push("armstrong");
    if (num % 2 === 0) props.push("even");
    else props.push("odd");
    return props;
}

function isArmstrong(num) {
    const strNum = String(num);
    const n = strNum.length;
    let sum = 0;
    for (let digit of strNum) {
        sum += Math.pow(parseInt(digit), n);
    }
    return sum === num;
}

function sumDigits(num) {
    let sum = 0;
    const strNum = String(num);
    for (let digit of strNum) {
        sum += parseInt(digit);
    }
    return sum;
}


app.get('/api/classify-number', async (req, res) => {
    const number = req.query.number;
    if (isNaN(number)) {
        return res.status(400).json({
            number: "alphabet",
            error: true
        });
    }
    const result = classifyNumber(number);


    try {
        result.fun_fact = await getFunFact(result.number);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

 
app.listen(port, () => {
    console.log(`Server is listening on port ${ port }`);
});