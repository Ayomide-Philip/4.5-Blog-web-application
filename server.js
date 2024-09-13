import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Return all the blog available in my website memory
app.get("/posts", (req, res) => {
  res.json(blog);
});

// This is a  where i get a particual blog post by its ID
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var postIndex;

  console.log(id);
  for (let i = 0; i < blog.length; i++) {
    if (blog[i].id === id) {
      postIndex = i;
    }
  }
  if (postIndex == undefined) {
    res.json({ content: `The Blog post never exists, or Has been deleted` });
  } else {
    res.json(blog[postIndex]);
  }
});

// To Post a new data in a form
app.post("/posts/new", (req, res) => {
  console.log(req.body);

  var newBlog = {
    id: blog.length + 1,
    header: req.body.header,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };

  console.log(newBlog);
  blog.push(newBlog);
  res.json(blog[blog.length - 1]);
});

app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var blogIndex;
  var oldBlog;
  for (let i = 0; i < blog.length; i++) {
    if (blog[i].id === id) {
      blogIndex = i;
      oldBlog = blog[i];
    }
  }

  const updatedBlog = {
    id: id,
    header: req.body.header || oldBlog.header,
    content: req.body.content || oldBlog.content,
    author: req.body.author || oldBlog.author,
    date: new Date(),
  };

  blog[blogIndex] = updatedBlog;

  res.json(blog[blogIndex]);
});

app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var blogIndex;
  for (let i = 0; i < blog.length; i++) {
    if (blog[i].id === id) {
      blogIndex = i;
    }
  }

  blog.splice(blogIndex, 1);

  res.json({ content: `The message has been sucessfully deleted` });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

var blog = [
  {
    id: 1,
    header: `Front-end Development`,
    content:
      "Front-end development is the process of creating the user interface of a website or web application. It involves the use of HTML, CSS, and JavaScript to design and develop the look and feel of a website, as well as its functionality.",
    author: `Philip`,
    date: "2024-09-02T17:31:56.172Z",
  },
  {
    id: 2,
    header: `Back-end Development`,
    content: `Back-end development focuses on server-side logic, databases, and application integration. It ensures smooth data processing and server functionality, building the foundation for web and mobile applications. Skills in languages like Python, Java, and Node.js, along with knowledge of databases and APIs, are essential for creating robust, scalable solutions.`,
    author: `Philip`,
    date: "2024-09-02T17:31:56.172Z",
  },
];
