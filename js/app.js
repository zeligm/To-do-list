//Problem: User interaction doesn't provide desired results.
//Solution: Add interactivity so the user can manage daily tasks. 

var taskInput = document.getElementById('new-task'); //#new-task
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTasksHolder = document.getElementById('incomplete-tasks'); //#incomplete-tasks
var completedTasksHolder = document.getElementById('completed-tasks');//#completed-tasks

//New task list item
var createNewTaskElement = function (taskString) {
	//Create list item
	var listItem = document.createElement('li');
	//Input (checkbox)
	var checkbox = document.createElement('input'); //checkbox
	//Label
	var label = document.createElement('label');
	//Input (text)
	var editInput = document.createElement('input'); //text
	//button.edit
	var editButton = document.createElement('button');
	//button.delete
	var deleteButton = document.createElement('button');
	//Each elements needs modifying

	checkbox.type = 'checkbox';
	editInput.type = 'text';

	editButton.innerText = 'Edit';
	editButton.className = 'edit';
	deleteButton.innerText = 'Delete';
	deleteButton.className = 'delete';
	label.innerText = taskString;

	//Each element needs appending
	listItem.appendChild(checkbox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}

//Add a new task
var addTask = function () {
	console.log('Add task...');
		//Create a new list item with the text from the #new-task:
		var listItem = createNewTaskElement(taskInput.value);
		//Append listItem to incompleteTaskHolder
		incompleteTasksHolder.appendChild(listItem);
		bindTaskEvents(listItem, taskCompleted);
		taskInput.value = '';
}

//Edit an existing task
var editTask = function () {
	console.log('Edit task...');

	var listItem = this.parentNode;
	var editInput = listItem.querySelector('input[type = text]');
	var label = listItem.querySelector('label');
	var containsClass = listItem.classList.contains('editMode');
		//If the class of the parent has .editMode
		if(containsClass) {
			//Switch from .editMode
			//Label text becomes the input value
			label.innerText = editInput.value;
		} else {
			//Switch to .editMode
			//Input value becomes the label's text
			editInput.value = label.innerText;
		}
		//Toggle .editMode on the list item
		listItem.classList.toggle('editMode');
}

//Delete an existing task
var deleteTask = function () {
	console.log('Delete task...');
	//Remove parent list item from the ul
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	ul.removeChild(listItem);
}


//Mark a task as completed
var taskCompleted = function () {
	console.log('Task completed...');
	//Append the task list item to the #completed-tasks
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
var taskIncomplete = function () {
	console.log('Task incomplete...');
	//Append the task list item to the #incomple-tasks
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function (taskListItem, CheckBoxEventHandler) {
		console.log('Bind list event items...');
		//Select taskListItems's children
		var checkbox = taskListItem.querySelector('input[type = checkbox]');
		var editButton = taskListItem.querySelector('button.edit');
		var deleteButton = taskListItem.querySelector('button.delete');

		//Bind editTask to edit button
		editButton.onclick = editTask;
		//Bind deleteTask to delete button
		deleteButton.onclick = deleteTask;
		//Bind CheckBoxEventHandler to the checkbox
		checkbox.onchange = CheckBoxEventHandler;
	}

var ajaxRequest = function () {
	console.log('AJAX request...');
}

//Set the click handler to the addTask function
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);


//Cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
	//Bind event to list item's children (taskCompleted)
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//Cycle over the completedTaskHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
	////Bind event to list item's children (taskIncomplete)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
