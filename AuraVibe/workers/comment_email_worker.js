const queue = require("../config/kue");
const commentsMailer = require("../mailers/comments_mailer");

queue.process("emails", function (job, done) {
  //   console.log("worker is running !", job.data);

  commentsMailer.newCommment(job.data);

  done();
});
