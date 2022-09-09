// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getPathFolderFocus, runGitCommand, runDartCommand } from './utils';

const SCRIPTS_PATH = 'scripts';
const SCRIPT_MAKE_PUB_GET_PATH = `${SCRIPTS_PATH}/make-clean-pub-get.sh`;
const SCRIPT_MAKE_PULL_WORKSPACE_PATH = `${SCRIPTS_PATH}/make-clean-pub-get-workspace.sh`;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.debug) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.debug(
		'Congratulations, your extension "emirdeliz-dart-utils" is now active!'
	);

	// https://github.com/Microsoft/vscode/issues/3553

	const disposableInitialize = vscode.commands.registerCommand(
		'emirdeliz-dart-utils.initialize',
		async () => {
			// The code you place here will be executed every time your command is executed
			// Display a message box to the user
			vscode.window.showInformationMessage(
				'Hello World from emirdeliz-dart-utils!'
			);

			// const folderPath = await getPathFolderFocus();
			// vscode.commands.executeCommand(
			// 	'setContext',
			// 	'emirdeliz-dart-utils.explorerResourceIsFolderAndHasGitConfig',
			// 	checkFolderHasGitConfig(folderPath)
			// );
		}
	);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposableCleanPubGet = vscode.commands.registerCommand(
		'emirdeliz-dart-utils.clean-pub-get',
		async () => {
			// The code you place here will be executed every time your command is executed
			// Display a message box to the user
			vscode.window.showInformationMessage(
				`Aloha! Let's go to run clean and pub get for the project  🤘...`
			);

			const folderPath = await getPathFolderFocus();
			await runDartCommand(`cd ${folderPath} && ${SCRIPT_MAKE_PUB_GET_PATH}`);
		}
	);

	const disposableCleanPubGetWorkspace = vscode.commands.registerCommand(
		'emirdeliz-dart-utils.clean-pub-get-workspace',
		async () => {
			vscode.window.showInformationMessage(
				`Aloha! Let's go to run clean and pub get each project on the root of the workspace 🤘...`
			);

			// const activeWorkspaceFolder = vscode.workspace.getWorkspaceFolder(
			// 	vscode.window.activeNotebookEditor?.notebook.uri
			// 	// .activeTextEditor.document.uri
			// );
			const workspaceFolders = vscode.workspace.workspaceFolders;
			for (const folder in workspaceFolders) {
				await runDartCommand(`cd ${folder} && ${SCRIPT_MAKE_PUB_GET_PATH}`);
			}
		}
	);

	const disposablePullWorkspace = vscode.commands.registerCommand(
		'emirdeliz-dart-utils.pull-workspace',
		async () => {
			vscode.window.showInformationMessage(
				`Aloha! Let's go to run git pull for each project on the root of the workspace.🤘...`
			);

			// const gitFolders = await vscode.workspace.getWorkspaceFolder();
			// const workspaceFolders = (await vscode.workspace.fs.readDirectory()).entries();

			// console.debug({
			// 	workspaceFolders,
			// });

			for (const folder in vscode.workspace.getConfiguration()) {
				// await runGitCommand(
				// 	`cd ${folder} && ${SCRIPT_MAKE_PULL_WORKSPACE_PATH}`
				// );
			}
		}
	);

	context.subscriptions.push(disposableInitialize);
	context.subscriptions.push(disposableCleanPubGet);
	context.subscriptions.push(disposableCleanPubGetWorkspace);
	context.subscriptions.push(disposablePullWorkspace);
}

// this method is called when your extension is deactivated
export function deactivate() {}
