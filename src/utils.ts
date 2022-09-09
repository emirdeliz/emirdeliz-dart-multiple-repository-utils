import * as fs from 'fs';
import * as vscode from 'vscode';

const FLUTTER_NAME_FILE_CONFIG = 'pubspec.yaml';
const GIT_NAME_FOLDER_CONFIG = '.git';

export async function getPathFolderFocus() {
	await vscode.commands.executeCommand('copyFilePath');
	const folderPath = await vscode.env.clipboard.readText();
	return folderPath;
}

export async function checkFolderHasFolder(folderPath: string, folder: string) {
	const dartFileConfigPath = `${folderPath}/${folder}`;
	return fs.existsSync(dartFileConfigPath);
}

export async function checkFolderHasGitConfig(folderPath: string) {
	console.debug(
		'folderPath: ' +
			folderPath +
			' ' +
			checkFolderHasFolder(folderPath, GIT_NAME_FOLDER_CONFIG)
	);
	return checkFolderHasFolder(folderPath, GIT_NAME_FOLDER_CONFIG);
}

export async function runCommand(command: string) {
	try {
		await vscode.commands.executeCommand(command);
	} catch (e) {
		console.debug(
			`🥵 An error occurred when executing the dart command: ${e}`
		);
	}
}

export async function runDartCommand(command: string) {
	const folderPath = await getPathFolderFocus();
	if (!checkFolderHasFolder(folderPath, FLUTTER_NAME_FILE_CONFIG)) {
		return;
	}
	await runCommand(command);
}

export async function runGitCommand(command: string) {
	const folderPath = await getPathFolderFocus();
	if (!checkFolderHasGitConfig(folderPath)) {
		return;
	}
	await runCommand(command);
}
