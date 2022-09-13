// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getPathFolderFocus, runDartCommand } from 'emirdeliz-vs-extension-utils';

const SCRIPTS_PATH = 'scripts';
const SCRIPT_MAKE_PUB_GET_PATH = `${SCRIPTS_PATH}/make-clean-pub-get.sh`;

export function activate(context: vscode.ExtensionContext) {
	console.debug(
		'Congratulations, your extension "emirdeliz-dart-multiple-repository-utils" is now active!'
	);

	const disposableCleanPubGet = vscode.commands.registerCommand(
		'emirdeliz-dart-multiple-repository-utils.clean-pub-get',
		async () => {
			vscode.window.showInformationMessage(
				`Aloha! Let's go to run clean and pub get for the project  🤘...`
			);

			const folderPath = await getPathFolderFocus();
			await runDartCommand(`cd ${folderPath} && ${SCRIPT_MAKE_PUB_GET_PATH}`);
		}
	);

	const disposableCleanPubGetWorkspace = vscode.commands.registerCommand(
		'emirdeliz-dart-multiple-repository-utils.clean-pub-get-workspace',
		async () => {
			vscode.window.showInformationMessage(
				`Aloha! Let's go to run clean and pub get each project on the root of the workspace 🤘...`
			);

			const workspaceFolders = vscode.workspace.workspaceFolders;
			for (const folder in workspaceFolders) {
				await runDartCommand(`cd ${folder} && ${SCRIPT_MAKE_PUB_GET_PATH}`);
			}
		}
	);

	context.subscriptions.push(disposableCleanPubGet);
	context.subscriptions.push(disposableCleanPubGetWorkspace);
}

export function deactivate() {}
