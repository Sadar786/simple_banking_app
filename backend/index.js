const express = require("express");
const cors = require('cors')
const app = express();
require("./db/config")
const User = require('./db/User')
const Products = require('./db/Products')

app.use(express.json())
app.use(cors( ))
const jwt = require('jsonwebtoken')
const jwtKey = 'e-comm'

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

app.post('/register', async (req, res) => {
  const { name, email, password,money } = req.body;
  const presentUser = await User.findOne({ email });
  if (presentUser) {
    res.send("this email is already used");
    return false;
  } else {
    let user = new User({ name, email, password, money });
    let result = await user.save();
    result = result.toObject()
    delete result.password;
    if (result) {
      jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          res.send({ result: "something wants wrong!" })
        }
        res.send({ result, auth: token })
      })
    } else {
      res.send("The User Not Found.")
    }
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (req.body.password && req.body.email) {
    const user = await User.findOne({ email, password }).select('-password');
    if (user) {
      jwt.sign({ user }, jwtKey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          res.send({ result: "something wants wrong!" })
        }
        res.status(200).json({ user, auth: token })
      })
    } else {
      res.send("The User Not Found.")
    }
  } else {
    res.send({ result: " User Name Or Password Incorrect" })
  }
})

app.post('/add_product',verifyToken, async (req, res) => {
  const product = new Products(req.body);
  const result = await product.save();
  res.status(200).json(result)
})

app.get('/product', verifyToken,async (req, res) => {
  const Produts = await Products.find();

  if (Produts.length > 0) {
    res.send(Produts)
  }
  else {
    res.send('Products  not found')
  }
})

app.delete('/delProduct/:id',verifyToken, async (req, res) => {
  try {
    const result = await Products.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 1) {
      res.send('Product deleted successfully.');
    } else {
      res.send('Product not found or could not be deleted.');
    }
  } catch (error) {
    console.error(error); // Add this line to log the error
    res.status(500).send('An error occurred while deleting the product.');
  }
});

app.get('/Products/:id',verifyToken, async (req, res) => {
  let result = await Products.findOne({ _id: req.params.id })
  if (result) {
    res.send(result)
  } else {
    res.send('not found')
  }
})


app.put('/product/:id',verifyToken, async (req, res) => {
  try {
    const result = await Products.updateOne({ _id: req.params.id }, { $set: req.body });
    if (result.nModified > 0) {
      res.status(200).json('Product updated successfully.')
    } else {
      res.status(200).json('Product not found or could not be updated.')
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the product.');
  }
});

app.get('/search/:key',verifyToken,  async (req, res) => {
  let result = await Products.find(
    {
      '$or': [
        { name: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
        { catagory: { $regex: req.params.key } }
      ]
    }
  )
  if (result) {
    res.status(200).json(result)
  }
})


function verifyToken(req, res, next) {
  let token = req.headers['authorization']
  if (token) {
    token = token.split(' ')[1];
    console.log("Middleware is running......", token);
    jwt.verify(token, jwtKey, (err, success)=>{
      if (err) {
        res.status(401).json("Error in verufiaction! Enter Valid Token")
      }
      next();
    })
  } else {
    res.status(402).json("Token not found! Add token with headers")
  }
}