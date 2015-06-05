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

  taskList = _.reject(taskList, function (y) {

    return y.status === 'Done';

  });

  console.log(taskList);

  $('#tasks').empty();

  _.each(taskList, function (data) {
    $('#tasks').append(template.addtask(data));
  });


}); // ends clear on click function


// });

// }());
