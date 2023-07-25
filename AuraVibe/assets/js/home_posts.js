{
  //! Method to submit the form data for newa post using AJAX
  let createPost = function () {
    //* preventing the default submission of form.
    //used jquery here to get the form and when form's submit button is pressed stop the default behaviour which was to create the post from logic written in controller.
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create-post",
        data: newPostForm.serialize(),
        success: function (data) {
          console.log("Logged from JS file from AJAX");
          console.log(data);
          let newPost = new newPostInDom(data.data.post);
          $("#post-list-container>ul").prepend(newPost);
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  let newPostInDom = function (post) {
    return $(`
    <li id="post-${post._id}">
      <div class="feed-container__post-info">
          <small
            ><a class="delete-post-button" href="/posts/destroy/${post.id}"
              >Delete Post</a
            ></small
        >

        <p class="feed-container__post-user">${post.user.name}</p>
        <p class="feed-container__post-content">${post.content}</p>
      </div>
  
    <div class="post-comments">
      <form action="/comments/create-comment" method="POST">
        <input type="text" name="content" placeholder="Add a Comment.." required />
        <input type="hidden" name="post" value="${post._id}" />
        <input type="submit" value="Comment" />
      </form>
    
      <div class="post-comments-list">
        <ul id="post-comment-${post._id}">
          
        </ul>
      </div>
    </div>
    
  </li>
  `);
  };

  //! Method to create a post in DOM
  createPost();

  //!include this part after creating the comment. Add it inside post-comments-list's ul list.
  /*   <li>
            <% for(comment of post.comments){%>
              <p><%= comment.content %></p>
              <br />
              <small><%= comment.user.name %></small>
              <% if (locals.user.id == comment.user.id) { %>
              <small
                ><a href="/comments/destroy/<%= comment.id %>"
                  >Delete Comment</a
                ></small
              >
              <% } %> 
            <% } %>
          </li> */
}
