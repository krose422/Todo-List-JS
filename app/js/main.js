// (function() {

// 'use strict';


// Constructor for Todo item
// ==========================

var Todo = function (options) {
  var args = options || {};
  this.task = args.task;
  this.status = 'Open';
};


// Instance creation, add to array, append to DOM
// =======================================================

var taskList = [];

$('#addTask').on('submit', function (event) {
  event.preventDefault();
  addTask();
  this.reset();
});

function addTask () {
  var task = $('#task').val();
  var taskInstance = new Todo({ task: task });

  taskList.push(taskInstance);
  $('#tasks').append(template.addtask(taskInstance));

  // KELLEY FIX BUG TO NOT ADD A BLANK INPUT TO LIST

}


// Toggle checkmark when item clicked, and toggle status
// =======================================================

$('#tasks').on('click', 'li', function (event) {

  event.preventDefault();

  $(this).addClass('complete');

  var tTask = $(this).find('span').text();
  var taskToEdit = _.find(taskList, { task: tTask });

  taskToEdit.status = 'Done';
  console.log(taskList);

  // var date = moment().format('MMM DD, YYYY');
  // KELLEY FIX BUG TO NOT ADD A BLANK INPUT TO LIST
  // KELLEY - FIX BUG TO ONLY ADD TIMESTAMP TO ITEMS DONE
    // $('this .timestamp').html(date);
});

$('#tasks').on('click', '.complete', function (event) {
  event.preventDefault();

  $(this).removeClass('complete');

  var tTask = $(this).find('span').text();
  var taskToEdit = _.find(taskList, { task: tTask });

  taskToEdit.status = 'Open';
  // console.log(taskList);

});


// Clear items from list in HTML and from array
// =============================================

$('#clear').on('click', function (event) {
  event.preventDefault();

  taskList = taskList.filter ( function (y) {
    if (y.status ===  'Open') {
      return y;
    }
    // taskList.push(y);
    console.log(taskList);

    if (y.status === 'Done') {
      var yTask = y.task;
      // console.log(y.task);

      console.log($('.complete span').text());

      var completedText = $('.complete span').text();

      if (y.task === completedText) {
        $('li .complete').remove();
      }

    }

  }); // ends filter function

  // console.log(taskList);

}); // ends clear on click function



// });

// }());
