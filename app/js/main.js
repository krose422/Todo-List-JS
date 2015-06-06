(function() {
'use strict';

// TODO ITEM CONSTRUCTOR
// ==========================

var Todo = function (options) {
  var args = options || {};
  this.task = args.task;
  this.status = 'Open';
};

// CREATE INSTANCE FROM HTML INPUT
// ===================================

var taskList = [];

// on submit event action
$('#addTask').on('submit', function (event) {
  event.preventDefault();
  addTask();
  this.reset();
});

function addTask () {
  var task = $('#task').val();
  // if task name is not blank, add instance and push to taskList array
  if (task !== '') {
    var taskInstance = new Todo({ task: task });
    taskList.push(taskInstance);
    // append taskList items to HTML
    $('#tasks').prepend(template.addtask(taskInstance));
    // run count function to update counter in HTML
    count();
  }
}


// TOGGLE COMPLETE CHECKMARK ON CLICK, TOGGLE OBJECT STATUS ON CLICK
// ==================================================================

$('#tasks').on('click', 'li', function (event) {
  event.preventDefault();
  // add 'complete' class to add checkmark in HTML
  $(this).addClass('complete');
  // get item text from HTML and find object in array that matches
  var tTask = $(this).find('span').text();
  var taskToEdit = _.find(taskList, { task: tTask });
  // change found item status to 'Done'
  taskToEdit.status = 'Done';
  // timestamp when completed into HTML
  var date = moment().format('MMM DD, YYYY');
  var time = moment().format('hh:mm');
  $(this).find('.timestamp').html('completed on ' + date + ' at ' + time);
  // run count function to update counter in HTML
  count();
});

$('#tasks').on('click', '.complete', function (event) {
  event.preventDefault();
  // remove class from HTML item to remove checkmark
  $(this).removeClass('complete');
  // remove timestamp from HTML
  $(this).find('.timestamp').html('');
  // get item text from HTML and find object in array that matches
  var tTask = $(this).find('span').text();
  var taskToEdit = _.find(taskList, { task: tTask });
  // change found item status to 'Open'
  taskToEdit.status = 'Open';
  // run count function to update counter in HTML
  count();
});


// CLEAR COMPLETED BUTTON
// =============================================

$('#clear').on('click', function (event) {
  event.preventDefault();
  // update array by removing all items with 'Done' status
  taskList = _.reject(taskList, function (y) {
    return y.status === 'Done';
  });
  // update count with array length since only 'Open' tasks remain
  $('.count').html(taskList.length);
  // empty current list from HTML
  $('#tasks').empty();
  // append each item in updated task list back into HTML ('Open' only)
  _.each(taskList, function (data) {
    $('#tasks').append(template.addtask(data));
  });
});

// SORT ITEMS WITH BUTTONS IN HTML
// ================================

// Declare new arrays needed
var incompleteList = [];
var completeList = [];

// SORT: INCOMPLETE ITEMS
// ======================
$('.sorting').on('click', '#incomplete', function (event) {
  event.preventDefault();
  $(this).addClass('sorted');
  $(this).siblings().removeClass('sorted');
  // populate array with only completed items
  incompleteList = _.filter(taskList, function (t) {
    return t.status === 'Open';
  });
  // empty previous array from HTML and append new array
  $('#tasks').empty();
  _.each(incompleteList, function (data) {
    $('#tasks').append(template.addtask(data));
  });

});

// SORT: COMPLETED ITEMS
// ======================
$('.sorting').on('click', '#completed', function (event) {
  event.preventDefault();
  $(this).addClass('sorted');
  $(this).siblings().removeClass('sorted');
  // populate array with only completed items
  completeList = _.filter(taskList, function (t) {
    return t.status === 'Done';
  });
  // empty previous array from HTML and append new array
  $('#tasks').empty();
  _.each(completeList, function (data) {
    $('#tasks').append(template.addtask(data));
  });
  // add 'complete' class back on items since they are all completed
  $('li').addClass('complete');
});

// SORT: ALL ITEMS
// ======================
$('.sorting').on('click', '#all', function (event) {
  event.preventDefault();
  $(this).addClass('sorted');
  $(this).siblings().removeClass('sorted');
  // empty previous array from HTML
  $('#tasks').empty();
  // add class back on to completed items in initial array for checkmark
  _.each(taskList, function (data) {
    if (data.status === 'Done') {
      $('li').addClass('complete');
    }
  // append all items back into HTML
  $('#tasks').append(template.addtask(data));
  });
});

// COUNTER
// ====================

// count number of open items into variable
function count () {
  var taskCount = 0;
  _.each(taskList, function (taskitem) {
    if (taskitem.status === 'Open') {
      taskCount++;
    }
    $('.count').html(taskCount);
  });
}


}());
