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
          let newPost = new newPostInDom(data.data.post, data.data.userName);
          $("#post-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  let newPostInDom = function (post, userName) {
    return $(`
    <li id="post-${post._id}">
      <div class="feed-container__post-info">
          <small
            ><a class="delete-post-button" href="/posts/destroy/${post._id}"
              >Delete Post</a
            ></small
        >

        <p class="feed-container__post-user">${userName}</p>
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

  // method to delete a post from DOM using AJAX
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            theme: "relax",
            text: "Post Deleted",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  //! calling above main function to create the post in dom.
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
