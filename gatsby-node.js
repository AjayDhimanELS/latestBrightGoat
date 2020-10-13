// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
const path = require('path')

// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   if (stage === "build-html") {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: '/app/susubject',
//             use: loaders.null(),
//           },
//         ],
//       },
//     })
//   }
// }

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    if (page.path.match(/^\/app/)) {
      page.matchPath = "/app/*"
      // Update the page.
      createPage(page)
    }
    // page.matchPath is a special key that's used for matching pages
    // only on the client.
  }

  exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
  
  const subjectsconst = await graphql(`
  query{
    allMysqlSubjects{
      edges{
        node{
          name
          mysqlId
          subject_id
        }
      }
    }
  }
  
  `).then(res=>res.data)

  const pageTemplate = path.resolve('./src/components/subject.js')
  subjectsconst.allMysqlSubjects.edges.forEach((edge) => {
    createPage({
      path: `/app/${edge.node.name}`,
      component: pageTemplate,
      context: {
        theId: edge.node.subject_id,
      },
    })
  })

  ////////////////////// second query //////////////////////////////////////////////////////////////

  const subsubjectsconst = await graphql(`
  query{
    allMysqlSubjects{
      edges{
        node{
          name
          subject_id
          books{
            name
            book_id
          }
        }
      }
    }
  }
  `).then(res=>res.data)
   let prev;
  const subpageTemplate = path.resolve('./src/components/subsubject.js')
  subsubjectsconst.allMysqlSubjects.edges.forEach(edge => {
    edge.node.books.forEach((book) =>{
      
      if(book.name!==prev)
      {
        createPage({
        path: `/app/${edge.node.name}/${book.book_id}`,
        component: subpageTemplate,
        context: {
          theId: book.book_id,
          contValue: edge.node.name
          }
        })
      }
      prev = book.name
    })
  })

}
/////////////////////////////////////    mysql-connection    ///////////////////////////////////////////////////

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

var mysql = require('mysql');
var express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { navigate } = require('@reach/router')


var app = express();
app.use(bodyParser.json({ extended: true }));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'brightgo_admin',
  password: 'ENubME5(znPM',
  database: 'brightgo_testthree'
});

 connection.connect();

app.post('/api/users', function(req, res) {
  var user = req.body;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        // Store hash in password DB.
        var query = connection.query('INSERT INTO users values (?, ?, ?)', [null, user.name, hash], function(err, result) {
          if(err)console.log(err);
        });  
      });
    });  
});

app.get('/api/app/login', function(req, res) {
  console.log("Getting the request *****************************************************************************");
  var query = connection.query('SELECT name,password from users', function(err, result) {
    if(err)console.log(err);
    return res.send(result); 
  });
});

app.get('/api/addData', function(req, res) {
  console.log("Getting the request *****************************************************************************");
  var query = connection.query('select s.name as subject,b.name,b.image,c.chapter,c.section,c.qno from books b, subjects s, chapters c where s.subject_id = b.subject_id and b.book_id=c.book_id', function(err, result) {
    if(err)console.log(err);
    return res.send(result); 
  });
});


app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', function(req,res) {  
  res.sendFile(path.join(__dirname,'public/index.html'));
});

app.listen(8001, function() {
  console.log('App listening on port 8001!');
});
