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

function addTasks () {
  var task = $('#task').val();
  var taskInstance = new Todo({ task: task });

  taskList.push(taskInstance);
  $('#tasks').append('<li>' + task + '</li>');
}

$('#addTask').on('submit', function (event) {
  event.preventDefault();
  addTasks();
  this.reset();
});



// Toggle checkmark when item clicked, and toggle status
// =======================================================

$('#tasks').on('click', 'li', function (event) {

  event.preventDefault();

  $(this).toggleClass('complete');
  var now = moment(new Date());
  $(this).append('<span>completed at ' + now);

// FIX BUG - CHANGES TWICE, BUT THEN STAYS 'OPEN'
  var tTask = $(this).text();
  var taskToEdit = _.find(taskList, { task: tTask });

  if (taskToEdit.status === 'Open') {
    taskToEdit.status = 'Done';
    // console.log(taskToEdit);
  } else if (taskToEdit.status === 'Done') {
    taskToEdit = 'Open';
    // console.log(taskToEdit);
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
