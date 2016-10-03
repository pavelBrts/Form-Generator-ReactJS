Requirements:
	1. NodeJS has to be installed

How to start:
	1. Open command-line and navigate to the folder of the project
	2. In root folder type command "npm install"
	3. Navigate to folder /assets
	4. Type command "bower install"
	5. Type command "node server.js"
	6. If server started successfully in command-line will be message "Server is running: http://localhost:3000/"

How to use:
The main screen separated on three parts:
"List of Forms" - list of previously created forms. Per each form server creates separate file and stores it at the \assets\formJSON folder.
If you chose form from the "List of Form" it will appear at "Form Template". At same time you can add new fields for this form in the "Create Form". When you click "Create Form" a new form will be created (based on previous).

"Create Form" - generator for the new form. In order to create new form:
	1. Click "New Form" button and add new inputs and checkboxes. All your changes will be displayed at "Form Tempalate" part. 
	2. To save new form click button "Create Form" in the bottom of "Create Form" part. The new form will appear at "List of Forms".

Restriction:
Forms don't support a few inputs/checkboxes with the same labels.

For implementation I spent 10 hr. For the back-end logic 5hr. and for front-end 5hr. (it's my first experience with ReactJS).
