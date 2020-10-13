// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// })
module.exports = {
  siteMetadata: {
    title: 'BrightGoat',
    subtitle:'Learn in Videos',
    author: 'Ajay'
  },
  proxy: {
    prefix: "/api",
    url: "http://localhost:8001",
  },
  plugins: [  
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/videos`,
      },
    },
    {
      resolve: `gatsby-source-mysql`,
      options: {
        connectionDetails: {
          host: 'localhost',
          user: 'brightgo_admin',
          password: 'ENubME5(znPM',
          database: 'brightgo_testthree'
        },
        //  connectionDetails: {
        //   host: 'localhost',
        //   user: 'brightgo_admin',
        //   password: 'ENubME5(znPM',
        //   database: 'brightgo_testthree'
        //  },
        queries: [
          {
            statement: 'SELECT * FROM subjects',
            idFieldName: 'subject_id',
            name: 'subjects'
          },
          {
            statement: 'SELECT * FROM books',
            idFieldName: 'book_id',
            name: 'books',
            parentName: 'subjects',
            foreignKey: 'subject_id',
            cardinality: 'OneToMany'
          },
          {
            statement: 'SELECT * FROM chapters',
            idFieldName: 'id',
            name: 'chapters',
            parentName: 'books',
            foreignKey: 'book_id',
            cardinality: 'OneToMany'
          },
          {
            statement: 'SELECT * FROM users',
            idFieldName: 'id',
            name: 'users',
          }
        ]
      }
    }
  ],
}
