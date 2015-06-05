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

  if (task !== '') {
    var taskInstance = new Todo({ task: task });
    taskList.push(taskInstance);
    $('#tasks').append(template.addtask(taskInstance));
    $('.count').html(taskList.length);
  }

}


// Toggle checkmark when item clicked, and toggle status
// =======================================================

$('#tasks').on('click', 'li', function (event) {

  event.preventDefault();

  $(this).addClass('complete');

  var tTask = $(this).find('span').text();
  var taskToEdit = _.find(taskList, { task: tTask });

  taskToEdit.status = 'Done';

  var date = moment().format('MMM DD, YYYY');
  var time = moment().format('hh:mm');
  $(this).find('.timestamp').html('completed on ' + date + ' at ' + time);

  var taskCount = 0;

  _.each(taskList, function (taskitem) {
    if (taskitem.status === 'Open') {
      taskCount++;
    }

    $('.count').html(taskCount);

  });

});

$('#tasks').on('click', '.complete', function (event) {
  event.preventDefault();

  $(this).removeClass('complete');
  $(this).find('.timestamp').html('');

  var tTask = $(this).find('span').text();
  var taskToEdit = _.find(taskList, { task: tTask });

  taskToEdit.status = 'Open';

});


// Clear items from list in HTML and from array
// =============================================

$('#clear').on('click', function (event) {
  event.preventDefault();

  taskList = _.reject(taskList, function (y) {
    return y.status === 'Done';
  });

  $('.count').html(taskList.length);

  $('#tasks').empty();

  _.each(taskList, function (data) {
    $('#tasks').append(template.addtask(data));
  });

});



// });

// }());
