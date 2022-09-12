// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getAllFoldersWithGitConfig, runGitPullOnFolders } from './utils';

const SETTINGS_KEY_BASE = 'emirdeliz-multi-repo-git-utils';
const SETTINGS_KEY_GIT_IGNORE_FOLDERS = 'git-ignore';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.debug) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.debug(
		'Congratulations, your extension "emirdeliz-dart-utils" is now active!'
	);

	const disposablePullWorkspace = vscode.commands.registerCommand(
		'emirdeliz-dart-utils.pull-workspace',
		async ({}) => {
			vscode.window.showInformationMessage(
				`Aloha! Let's go to run git pull for each project on the root of the workspace.🤘...`
			);

			const workspaceFolders = vscode.workspace.workspaceFolders;
			const f = workspaceFolders
				? workspaceFolders[0]
				: ({} as vscode.WorkspaceFolder);

			if (!f?.uri || !f?.uri?.fsPath) {
				return;
			}

			const foldersWithGitConfig = getAllFoldersWithGitConfig(
				f.uri.fsPath,
				SETTINGS_KEY_BASE,
				SETTINGS_KEY_GIT_IGNORE_FOLDERS
			);
			await runGitPullOnFolders(foldersWithGitConfig);
		}
	);

	const disposableMergeWorkspace = vscode.commands.registerCommand(
		'emirdeliz-dart-utils.pull-workspace',
		async ({}) => {
			vscode.window.showInformationMessage(
				`Aloha! Let's go to run git pull for each project on the root of the workspace.🤘...`
			);

			const workspaceFolders = vscode.workspace.workspaceFolders;
			const f = workspaceFolders
				? workspaceFolders[0]
				: ({} as vscode.WorkspaceFolder);

			if (!f?.uri || !f?.uri?.fsPath) {
				return;
			}

			const foldersWithGitConfig = getAllFoldersWithGitConfig(
				f.uri.fsPath,
				SETTINGS_KEY_BASE,
				SETTINGS_KEY_GIT_IGNORE_FOLDERS
			);
			await runGitPullOnFolders(foldersWithGitConfig);
		}
	);

	context.subscriptions.push(disposablePullWorkspace);
	context.subscriptions.push(disposableMergeWorkspace);
}

// this method is called when your extension is deactivated
export function deactivate() {}
