const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const prettier = require("prettier");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);

function copyFiles(src, dest) {
  shell.exec(`cp -r ${src} ${dest}`);
}

app.post("/api/prettify", (req, res) => {
  const opt = {
    useTabs: false,
    printWidth: 60,
    tabWidth: 2,
    semi: true,
    singleQuote: true,
    bracketSpacing: false,
    jsxBracketSameLine: true,
    parser: `${req.body.parser}`,
    trailingComma: "all",
    arrowParens: "avoid",
    proseWrap: "preserve"
  };
  console.log("console: -----------------", req.body.code);

  const xxx = prettier.format(req.body.code, opt);
  console.log("console: xxxxx", xxx);

  res.json(xxx);
});

app.post("/api/exportFiles", (req, res) => {
  const name = req.body.name;
  const techno = req.body.techno;
  const dest = req.body.destination + `/${name}`;
  shell.mkdir(dest);

  if (req.body.projectType === "Service") {
    if (req.body.reducer || req.body.exportAll) {
      fs.writeFileSync(`${dest}/reducer.js`, req.body.reducer, "utf8");
    }

    if (req.body.saga || req.body.exportAll) {
      fs.writeFileSync(`${dest}/index.js`, req.body.saga, "utf8");
    }

    if (req.body.actions || req.body.exportAll) {
      fs.writeFileSync(`${dest}/actions.js`, req.body.actions, "utf8");
    }

    if (req.body.actionTypes || req.body.exportAll) {
      fs.writeFileSync(`${dest}/actionTypes.js`, req.body.actionTypes, "utf8");
    }
  } else {
    if (req.body.hoc || req.body.exportAll) {
      fs.writeFileSync(`${dest}/index.js`, req.body.hoc, "utf8");
    }

    if (req.body.component || req.body.exportAll) {
      fs.writeFileSync(
        `${dest}/${name}.js`,
        req.body.component.replace(/__/g, "."),
        "utf8"
      );
    }

    if (req.body.styles || req.body.exportAll) {
      const ext = req.body.techno === "React" ? "css" : "js";
      fs.writeFileSync(`${dest}/styles.${ext}`, req.body.styles, "utf8");
    }
  }

  res.json("done");
});

const port = process.env.PORT || 5000;
server.listen(port);

console.log("App is listening on port " + port);
