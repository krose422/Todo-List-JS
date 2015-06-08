(function() {
'use strict';


// TODO ITEM CONSTRUCTOR
// ==========================
var Todo = function (options) {
  var args = options || {};
  this.task = args.task;
  this.status = 'Open';
};

var toggle = function (a) {
  if (a.status === 'Open') {
    a.status = 'Done';
  } else if (a.status === 'Done') {
    a.status = 'Open';
  }

};

Todo.prototype.toggle = toggle;


// ARRAYS
//========
var taskList = [];
var incompleteList = [];
var completeList = [];


// CREATE INSTANCE FROM HTML INPUT
// ===================================
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
    $('#tasks').prepend(template.addtask(taskInstance));
    count();
  }
}

// TOGGLE COMPLETE CHECKMARK ON CLICK, TOGGLE OBJECT STATUS ON CLICK
// ==================================================================
$('#tasks').on('click', '.circle', function (event) {
  event.preventDefault();
  $(this).parent('li').addClass('complete');

  var tTask = $(this).siblings('span').text();
  var taskToEdit = _.find(taskList, { task: tTask });
  taskToEdit.toggle(taskToEdit);
  console.log(taskList);

  var date = moment().format('MMM DD, YYYY');
  var time = moment().format('hh:mm');
  $(this).siblings('.timestamp').html('completed on ' + date + ' at ' + time);
  count();
});

$('#tasks').on('click', '.complete', function (event) {
  event.preventDefault();
  $(this).removeClass('complete');
  $(this).find('.timestamp').html('');
  var tTask = $(this).find('span').text();
  var taskToEdit = _.find(taskList, { task: tTask });

  taskToEdit.status = 'Open';

  console.log(taskList);
  count();
});

// CLEAR COMPLETED BUTTON
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

// DELETE INDIVIDUAL ITEM
// ===============
$('#tasks').on('click', '.delete', function(event) {
  event.preventDefault();

  var tTask = $(this).siblings('span').text();
  var taskToUpdate = _.find(taskList, { task: tTask });
  taskToUpdate.status = 'Remove';

  taskList = _.reject(taskList, function (task) {
    return task.status === 'Remove';
  });

// KELLEY FIX BUG TO ADD COMPLETE CLASS BACK ON TO 'DONE' ITEMS

  $('#tasks').empty();
  _.each(taskList, function (data) {
    $('#tasks').append(template.addtask(data));
  });

});

// SORT: INCOMPLETE ITEMS
// ======================
$('.sorting').on('click', '#incomplete', function (event) {
  event.preventDefault();
  $(this).addClass('sorted');
  $(this).siblings().removeClass('sorted');

  incompleteList = _.filter(taskList, function (t) {
    return t.status === 'Open';
  });

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

  completeList = _.filter(taskList, function (t) {
    return t.status === 'Done';
  });

  $('#tasks').empty();
  _.each(completeList, function (data) {
    $('#tasks').append(template.addtask(data));
  });

  $('li').addClass('complete');
  console.log(taskList);
});

// SORT: ALL ITEMS
// ======================
$('.sorting').on('click', '#all', function (event) {
  event.preventDefault();
  $(this).addClass('sorted');
  $(this).siblings().removeClass('sorted');

  $('#tasks').empty();
  // add class back on to completed items in initial array for checkmark
// KELLEY TO FIX BUG - ADDING CLASS BACK ON TO COMPLETED TASKS
  _.each(taskList, function (data) {

    if (data.status === 'Done') {

      $('li').addClass('complete');
    }
  $('#tasks').append(template.addtask(data));
  });
});



// COUNTER
// ====================
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


// use below to remove items with delete button instead of re-appending a new array
// need to set up adding the _.random id # though like Tim showed in class

// taskList.forEach( function (t) {
//   if (t.status !== 'Open') {
//     taskList = _.without(taskList, t);
//     $('#' + t.id).remove();
//   }
// });


