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

  // KELLEY FIX BUG TO NOT ADD A BLANK INPUT TO LIST

  taskList.push(taskInstance);
  $('#tasks').append(template.timestamp(taskInstance));

  // $('#tasks').append('<li>' + task + '</li>');
}


// Toggle checkmark when item clicked, and toggle status
// =======================================================

$('#tasks').on('click', 'li', function (event) {

  event.preventDefault();

  $(this).toggleClass('complete');

// FIX BUG - CHANGES TWICE, BUT THEN STAYS 'OPEN'
  var tTask = $(this).text();
  var taskToEdit = _.find(taskList, { task: tTask });

  if (taskToEdit.status === 'Open') {
    taskToEdit.status = 'Done';
    console.log(taskToEdit);
  } else if (taskToEdit.status === 'Done') {
    taskToEdit = 'Open';
    console.log(taskToEdit);
  }

});


// Clear items from list in HTML and from array
// =============================================

$('#clear').on('click', function (event) {
  event.preventDefault();

  _.each(taskList, function (t) {
    if (t.status === 'Done') {
      taskList.splice(taskList.indexOf(t), 1);
      // $(this).remove(); // KELLEY FIX BUG TO REMOVE FROM HTML
      console.log(taskList);
    }

// KELLEY SEE WHY FILTER BELOW DOESN'T WORK
  // _.filter(taskList, function(t) {
  //   console.log(t.status !== 'Done');
  //   return t.status !== 'Done';
  // });
  // console.log(taskList);

  });

});

// }());
