import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import axios, { HttpStatusCode } from "axios";

const app = express();
const port = 3000;
const api_url = "http://localhost:4000";

app.use(express.static("public")); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// To render an home page with all the the post there
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${api_url}/posts`);
    res.render("index.ejs", { blog: response.data });
  } catch (error) {
    res.send("There was an error connecting with the server");
  }
});

// To render the post page
app.get("/posts/new", (req, res) => {
  res.render("post.ejs");
});

app.get("/posts/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${api_url}/posts/${req.params.id}`);
    res.render("post.ejs", { blog: response.data });
  } catch (error) {
    res.render("post.ejs", {
      blog: {
        content: error.message,
      },
    });
  }
});

app.post("/posts/edit/:id", async (req, res) => {
  try {
    const response = await axios.patch(
      `${api_url}/posts/${req.params.id}`,
      req.body
    );
    res.redirect("/");
  } catch (error) {
    res.render("post.ejs", {
      blog: {
        content: error.message,
      },
    });
  }
});

// To post a new post into to the blog website
app.post("/posts", async (req, res) => {
  try {
    const response = await axios.post(`${api_url}/posts/new`, req.body);
    console.log(req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.redirect("/posts/new");
  }
});

// To delete a post

app.get("/posts/delete/:id", async (req, res) => {
  try {
    const response = await axios.delete(`${api_url}/posts/${req.params.id}`);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`The server is listing on port ${port}`);
});
