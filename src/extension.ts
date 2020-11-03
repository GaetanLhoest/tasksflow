// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tasksflow" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable1 = vscode.commands.registerCommand('tasksflow.start_issue', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Starting to work on a given issue!');
	});

	let disposable2 = vscode.commands.registerCommand
	('tasksflow.issues', () => {
		vscode.window.showInformationMessage
	('List issues to start working on one of them!');
	});

	let disposable3 = vscode.commands.registerCommand
	('tasksflow.configure', () => {
		vscode.window.showInformationMessage
	('Configure the Tasksflow extension!');
	});

	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
}

// this method is called when your extension is deactivated
export function deactivate() {}
