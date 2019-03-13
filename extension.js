// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "codeposition" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World!');
	});
	let disposable2 = vscode.commands.registerTextEditorCommand('extension.codePosition', function (textEditor, TextEditorEdit) {
		// console.log(vscode)
		// console.log(textEditor, TextEditorEdit)
		vscode.window.showInputBox({
			ignoreFocusOut: false,
			password: false,
			placeHolder: 'Please input line number and column number. (e.g.: 12@375, 12 375, 12|375, 12/375)',
			prompt: '',
			value: ''
		})
		.then((res) => {
			console.log('bbb', res)
			let rFormat = /(\d+)[@/|\s](\d+)/i
			let matcher
			if (!res || !res.trim()) {
				vscode.window.showInformationMessage('Sorry, no input detected!')
			} else if (!(matcher = res.match(rFormat))) {
				vscode.window.showErrorMessage(`Invalid input format!\n
					Please provide the line/col number in one of the format below:\n
					LineNumber@ColNumber\n
					LineNumber ColNumber\n
					LineNumber|ColNumber\n
					LineNumber/ColNumber\n
				`)
			} else {
				let LineNumber = matcher[1] * 1
				let ColNumber = matcher[2] * 1
				let Range = vscode.Range
				let Position = vscode.Position
				let doc = vscode.window.activeTextEditor.document
				let newRange = new Range(new Position(LineNumber, ColNumber), new Position(LineNumber, ColNumber))
				// TODO: 光标定位
				vscode.window.activeTextEditor.revealRange(newRange, 1)
				// vscode.window.onDidChangeTextEditorSelection(e => {
				// 	console.log('editor:', e)
				// })
			}
		})
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
