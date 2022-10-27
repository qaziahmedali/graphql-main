const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.use(express.static("public"));
if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("app is running on port ", PORT);
});
