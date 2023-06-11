// Import required modules
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const path = require("path");
const multer = require("multer");
const methodOverride = require("method-override");
const cors = require("cors");

const app = express();
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const router = express.Router();

// Configure the PostgreSQL connection
const pool = new Pool({
  host: "ep-summer-wildflower-276171.ap-southeast-1.aws.neon.tech",
  database: "proyeksbdnew",
  user: "andikha.wisanggeni",
  password: "VfWE7J1YRrqv",
  port: 5432,
  sslmode: "require",
  ssl: true,
});

pool.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database Connected");
});

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebase = require("firebase/app");
const { Router } = require("express");
const { getAnalytics } = require("firebase/analytics");
const { initializeApp } = require("firebase/app");
// require("firebase/analytics");
// require("firebase/storage");

const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyCF9GfQ2Qffphkp1XmCiSpRE20fA9Pgojg",
  authDomain: "open-cook-book-e9bb0.firebaseapp.com",
  projectId: "open-cook-book-e9bb0",
  storageBucket: "open-cook-book-e9bb0.appspot.com",
  messagingSenderId: "431927432762",
  appId: "1:431927432762:web:33a711a03869148ac60703",
  measurementId: "G-S49DHYE1J3",
};

firebase.initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(expressLayouts);
app.use(fileUpload());
app.use(express.static("public"));
app.use("/", router);
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true, // Add this line to allow sending cookies and other credentials
};

app.use(cors(corsOptions));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", { error: err });
});

function getUserFromSession(req) {
  return req.session.user;
}

function isAuthenticated(req, res, next) {
  const user = getUserFromSession(req); // You need to implement this function to retrieve the user object from the session or authentication middleware

  if (user) {
    req.user = user;
    next();
  } else {
    res.redirect("/login");
  }
}

router.get("/api/data", (req, res) => {
  const data = { message: "Hello from the backend!" };
  res.json(data);
});

// Homepage endpoint
router.get("/", async (req, res) => {
  const searchTerm = req.query.search || ""; // Get the search term from the query parameter
  if (req.session.user) {
    try {
      const query = `
              SELECT r.recipe_id, r.recipe_name, r.ingredients, r.steps, r.description, r.image, u.username
              FROM recipe r
              JOIN users u ON r.user_id = u.user_id
              WHERE r.recipe_name ILIKE '%' || $1 || '%' -- Filter recipes based on the search term
            `;
      const { rows: recipes } = await pool.query(query, [searchTerm]);
      console.log(recipes);
      // res.render("home", { recipes, user: req.session.user });
      res.json(recipes);
    } catch (error) {
      console.error("Error retrieving recipes:", error);
      // res.render("error", { error: "Failed to retrieve recipes" });
      res.json({ error: "Failed to retrieve recipes" });
    }
  } else {
    // User is not authenticated, render the home template without passing the user object
    // res.render("home");
    res.json({ error: "User is not authenticated" });
  }
});

router.get("/home", async (req, res) => {
  const searchTerm = req.query.search || ""; // Get the search term from the query parameter
  if (req.session.user) {
    try {
      const query = `
              SELECT r.recipe_id, r.recipe_name, r.ingredients, r.steps, r.description, r.image, u.username
              FROM recipe r
              JOIN users u ON r.user_id = u.user_id
              WHERE r.recipe_name ILIKE '%' || $1 || '%' -- Filter recipes based on the search term
            `;
      const { rows: recipes } = await pool.query(query, [searchTerm]);
      console.log(recipes);
      // res.render("home", { recipes, user: req.session.user });
      res.json(recipes);
    } catch (error) {
      console.error("Error retrieving recipes:", error);
      // res.render("error", { error: "Failed to retrieve recipes" });
      res.json({ error: "Failed to retrieve recipes" });
    }
  } else {
    // User is not authenticated, render the home template without passing the user object
    // res.render("home");
    res.json({ error: "User is not authenticated" });
  }
});

router.post("/follow/:id", isAuthenticated, async (req, res) => {
  const followerId = req.session.user.user_id;
  const followingId = req.params.id;

  try {
    // Check if the follow relationship already exists
    const checkQuery =
      "SELECT * FROM follows WHERE follower_id = $1 AND following_id = $2";
    const { rows: existingFollows } = await pool.query(checkQuery, [
      followerId,
      followingId,
    ]);

    if (existingFollows.length > 0) {
      // Follow relationship already exists
      return res.redirect("/profile");
    }

    // Insert the follow relationship into the database
    const insertQuery =
      "INSERT INTO follows (follower_id, following_id) VALUES ($1, $2)";
    await pool.query(insertQuery, [followerId, followingId]);

    res.redirect("/profile");
  } catch (error) {
    console.error("Error following user:", error);
    res.render("error", { error: "Failed to follow user" });
  }
});

router.post("/unfollow/:id", isAuthenticated, async (req, res) => {
  const followerId = req.session.user.user_id;
  const followingId = req.params.id;

  try {
    // Check if the follow relationship exists
    const checkQuery =
      "SELECT * FROM follows WHERE follower_id = $1 AND following_id = $2";
    const { rows: existingFollows } = await pool.query(checkQuery, [
      followerId,
      followingId,
    ]);

    if (existingFollows.length === 0) {
      // Follow relationship does not exist
      return res.redirect("/profile");
    }

    // Delete the follow relationship from the database
    const deleteQuery =
      "DELETE FROM follows WHERE follower_id = $1 AND following_id = $2";
    await pool.query(deleteQuery, [followerId, followingId]);

    res.redirect("/profile");
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.render("error", { error: "Failed to unfollow user" });
  }
});

// Profile endpoint
router.get("/profile", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user.user_id;

    // Fetch user's recipes
    const recipes = await pool.query(
      "SELECT * FROM recipe WHERE user_id = $1",
      [userId]
    );

    // Fetch user's followers
    const followerQuery = `
      SELECT users.*
      FROM users
      JOIN follows ON follows.follower_id = users.user_id
      WHERE follows.following_id = $1
    `;
    const { rows: followers } = await pool.query(followerQuery, [userId]);

    // Fetch user's followings
    const followingQuery = `
      SELECT users.*
      FROM users
      JOIN follows ON follows.following_id = users.user_id
      WHERE follows.follower_id = $1
    `;
    const { rows: followings } = await pool.query(followingQuery, [userId]);

    let users = [];

    // Check if a search term is provided
    if (req.query.search) {
      // Search for users based on the provided search term
      const searchTerm = req.query.search;
      const searchQuery = `
        SELECT *
        FROM users
        WHERE username.
        WHERE username ILIKE '%' || $1 || '%'
      `;
      const { rows } = await pool.query(searchQuery, [searchTerm]);
      users = rows;
    }

    res.render("profile", {
      user: req.session.user,
      recipes: recipes.rows,
      followers,
      followings,
      users,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.render("error", { error: "Failed to fetch user profile" });
  }
});

// Search user profile
router.get("/profile/search", isAuthenticated, async (req, res) => {
  const searchTerm = req.query.search || "";

  try {
    const query = `
      SELECT *
      FROM users
      WHERE username ILIKE '%' || $1 || '%'
    `;
    const { rows: users } = await pool.query(query, [searchTerm]);

    res.render("search", { users, searchTerm, user: req.session.user });
  } catch (error) {
    console.error("Error searching for users:", error);
    res.render("error", { error: "Failed to search for users" });
  }
});

// Registration  endpoint
router.get("/register", (req, res) => {
  res.json({ message: "Register" });
});

router.post("/register", async (req, res) => {
  const { full_name, username, email, password } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user data into the database
    await pool.query(
      "INSERT INTO users (full_name, username, email, password) VALUES ($1, $2, $3, $4)",
      [full_name, username, email, hashedPassword]
    );

    // Redirect to the login page or any other desired page
    req.session.user = {
      full_name,
      username,
      email,
    };
    // res.redirect("/");
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    // Handle the error and provide appropriate response to the user
    // res.render("register", { error: "Registration failed. Please try again." });
  }
});

// Login endpoint
router.get("/login", async (req, res) => {
  // res.render("login");
  // res.json({ message: "Login page" });
  try {
    const result = await pool.query("SELECT * FROM users");
    const users = result.rows;
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Failed to retrieve users." });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.query;
  try {
    // Find the user in the database based on their username
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];

    if (!user) {
      // User not found
      // return res.render("login", { error: "Invalid username or password" });
      return res.status(400).json({ error: "Invalid username " });
    }

    // Compare the entered password with the stored encrypted password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Incorrect password
      // return res.render("login", { error: "Invalid username or password" });
      return res.status(400).json({ error: "Invalid password" });
    }

    // Password is correct, set user information in session
    req.session.user = user;

    // Redirect to the homepage
    // res.redirect("/");
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    // Handle the error and provide appropriate response to the user
    // res.status(500).json({ error: "Login failed. Please try again." });
    // res.render("login", { error: "Login failed. Please try again." });
  }
});

router.get("/logout", (req, res) => {
  // Destroy the session and redirect to the home page
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err);
      // Handle the error and provide appropriate response to the user
      res.render("error", { error: "Logout failed. Please try again." });
    } else {
      // Redirect to the home page
      res.redirect("/");
    }
  });
});

router.get("/addrecipe", async (req, res) => {
  res.render("addrecipe", { title: "OpenCookBook - Add Recipe" });
});

router.post("/addrecipe", upload.single("image"), async (req, res) => {
  console.log("test");
  try {
    let imagenew;
    let uploadpath;
    let imagename;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
      imagenew = req.files.image;
      imagename = imagenew.name;

      uploadpath =
        require("path").resolve("./") + "/public/uploads/" + imagename;

      imagenew.mv(uploadpath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }

    const userId = req.session.user.user_id;

    const ingredients = Array.isArray(req.body.ingredients)
      ? req.body.ingredients
      : [req.body.ingredients];

    const steps = Array.isArray(req.body.steps)
      ? req.body.steps
      : [req.body.steps];

    const query = `
        INSERT INTO recipe (user_id, recipe_name, ingredients, steps, description, image)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING recipe_id;
      `;
    const values = [
      userId,
      req.body.name,
      ingredients,
      steps,
      req.body.description,
      imagename,
    ];

    const { rows } = await pool.query(query, values);
    const recipeId = rows[0].recipe_id;

    // res.redirect("/");
    res.json({ message: "Recipe added successfully" });
  } catch (error) {
    console.log(error); // Log the error to the console
    res.status(500).send(`Error occurred: ${error.message}`); // Include the error message in the response
  }
});

router.get("/recipe/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
    // Fetch the recipe from the database based on the recipeId
    const query = "SELECT * FROM recipe WHERE recipe_id = $1";
    const { rows } = await pool.query(query, [recipeId]);
    const recipe = rows[0];

    if (!recipe) {
      // Recipe not found
      res.render("error", { error: "Recipe not found" });
    } else {
      // Render the recipe details template and pass the recipe information
      const commentsQuery = `
        SELECT comment.*, users.full_name
        FROM comment
        INNER JOIN users ON comment.user_id = users.user_id
        WHERE comment.recipe_id = $1
        ORDER BY comment.created_at DESC
      `;
      const { rows: comments } = await pool.query(commentsQuery, [recipeId]);

      const ratingQuery = `
      SELECT COALESCE(AVG(rating), 0) AS average_rating
      FROM rating
      WHERE recipe_id = $1
      `;

      const ratingResult = await pool.query(ratingQuery, [recipeId]);
      const averageRating = Number(ratingResult.rows[0].average_rating) || 0;

      res.render("recipe", {
        recipe,
        comments,
        averageRating: averageRating.toFixed(1),
        user: req.session.user,
      });
    }
  } catch (error) {
    console.error("Error retrieving recipe details:", error);
    res.render("error", { error: "Failed to retrieve recipe details" });
  }
});

router.post("/recipe/:id/comment", async (req, res) => {
  const recipeId = req.params.id;
  const { commentText } = req.body;

  try {
    // Check if the user is logged in
    if (!req.session.user) {
      return res.redirect(`/login?redirect=/recipe/${recipeId}`);
    }

    // Insert the comment into the database
    const query = `
      INSERT INTO comment (recipe_id, user_id, comment_text, created_at)
      VALUES ($1, $2, $3, NOW())
    `;
    await pool.query(query, [recipeId, req.session.user.user_id, commentText]);

    // Redirect back to the recipe page
    res.redirect(`/recipe/${recipeId}`);
  } catch (error) {
    console.error("Error submitting comment:", error);
    res.render("error", { error: "Failed to submit comment" });
  }
});

router.post("/recipe/:id/rating", async (req, res) => {
  const recipeId = req.params.id;
  const { rating } = req.body;

  try {
    // Check if the user is logged in
    if (!req.session.user) {
      return res.redirect(`/login?redirect=/recipe/${recipeId}`);
    }

    // Insert the rating into the database
    const query = `
      INSERT INTO rating (recipe_id, user_id, rating)
      VALUES ($1, $2, $3)
    `;
    await pool.query(query, [recipeId, req.session.user.user_id, rating]);

    // Redirect back to the recipe page
    res.redirect(`/recipe/${recipeId}`);
  } catch (error) {
    console.error("Error submitting rating:", error);
    res.render("error", { error: "Failed to submit rating" });
  }
});

router.get("/editrecipe/:id", isAuthenticated, async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.session.user.user_id;

  try {
    // Fetch the recipe from the database based on the recipeId and user's ownership
    const query = "SELECT * FROM recipe WHERE recipe_id = $1 AND user_id = $2";
    const { rows } = await pool.query(query, [recipeId, userId]);
    const recipe = rows[0];

    if (!recipe) {
      // Recipe not found or user is not the owner
      res.render("error", {
        error: "Recipe not found or you are not the owner",
      });
    } else {
      // Render the recipe editing form and pass the recipe information
      res.render("editrecipe", { recipe });
    }
  } catch (error) {
    console.error("Error retrieving recipe for editing:", error);
    res.render("error", { error: "Failed to retrieve recipe for editing" });
  }
});

router.post("/editrecipe/:id", isAuthenticated, async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.session.user.user_id;
  const { name, ingredients, steps, description } = req.body;

  try {
    // Check if the recipe belongs to the user
    const query = "SELECT * FROM recipe WHERE recipe_id = $1 AND user_id = $2";
    const { rows } = await pool.query(query, [recipeId, userId]);
    const recipe = rows[0];

    if (!recipe) {
      // Recipe not found or user is not the owner
      res.render("error", {
        error: "Recipe not found or you are not the owner",
      });
    } else {
      // Update the recipe in the database
      const updateQuery =
        "UPDATE recipe SET recipe_name = $1, ingredients = $2, steps = $3, description = $4 WHERE recipe_id = $5";
      await pool.query(updateQuery, [
        name,
        ingredients,
        steps,
        description,
        recipeId,
      ]);
      res.redirect("/profile");
    }
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.render("error", { error: "Failed to update recipe" });
  }
});

router.post("/recipe/delete", async (req, res) => {
  const { recipeIds } = req.body;

  try {
    // Check if recipeIds is an array
    if (!Array.isArray(recipeIds)) {
      return res.status(400).send("Invalid request");
    }

    // Delete the ratings associated with the selected recipes
    await pool.query("DELETE FROM rating WHERE recipe_id = ANY($1)", [
      recipeIds,
    ]);

    // Delete the comments associated with the selected recipes
    await pool.query("DELETE FROM comment WHERE recipe_id = ANY($1)", [
      recipeIds,
    ]);

    // Delete the selected recipes based on their recipe_id
    const deleteQuery = "DELETE FROM recipe WHERE recipe_id = ANY($1)";
    await pool.query(deleteQuery, [recipeIds]);

    res.redirect("/profile");
  } catch (error) {
    console.error("Error deleting recipes:", error);
    res.render("error", { error: "Failed to delete recipes" });
  }
});

module.exports = router;

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
