const express = require("express");

const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const User = require('./db/userModel'); // Schema user của bạn
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
// const CommentRouter = require("./routes/CommentRouter");

app.use(cors({
  origin: 'http://localhost:3000', // frontend domain
  credentials: true,
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'photoAppSecretKey',
  resave: false,
  saveUninitialized: false
}));

dbConnect();

app.use(cors());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/photo", PhotoRouter);

// --- Login Route ---
app.post('/admin/login', async (req, res) => {
  const { login_name } = req.body;
  if (!login_name) {
    return res.status(400).send('login_name required');
  }

  const user = await User.findOne({ login_name });
  if (!user) {
    return res.status(400).send('Invalid login_name');
  }

  req.session.user = {
    _id: user._id,
    login_name: user.login_name,
    first_name: user.first_name,
  };

  res.status(200).json({
    _id: user._id,
    first_name: user.first_name,
    last_name: user.last_name
  });
});

// --- Logout Route ---
app.post('/admin/logout', (req, res) => {
  if (!req.session.user) {
    return res.status(400).send('No user is logged in');
  }

  req.session.destroy((err) => {
    if (err) return res.status(500).send('Logout error');
    res.status(200).send('Logged out');
  });
});

// --- Middleware to check login ---
app.use((req, res, next) => {
  if (req.path.startsWith('/admin')) {
    return next(); // login/logout routes
  }
  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }
  next();
});

// --- Example API route ---
app.get('/api/user/list', async (req, res) => {
  const users = await User.find({}, '_id first_name last_name');
  res.json(users);
});

// --- Start server ---
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


