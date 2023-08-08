//* usually in api we use index when we are listing something.
module.exports.index = function (req, res) {
  //!below line is deprecated.
  // return res.json(200,{});

  //same as above just syntax change.
  return res.status(200).json({
    data: {
      message: "list of posts",
      posts: [
        {
          post1: "Hello There!",
          post2: "Hi Barbie!",
          post3: "Hi ken!",
          post4: "hello All!",
        },
      ],
    },
  });
};
