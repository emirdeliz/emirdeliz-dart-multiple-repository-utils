import * as fs from 'fs';
import * as vscode from 'vscode';

const FLUTTER_NAME_FILE_CONFIG = 'pubspec.yaml';
const GIT_NAME_FOLDER_CONFIG = '.git';
const GIT_COMMANDS = {
	pull: 'pull'
};

export function getAllFoldersInDir(folderPathBase: string) {
	return fs.readdirSync(folderPathBase).filter(function (file) {
		return fs.statSync(`${folderPathBase}/${file}`).isDirectory();
	});
}

export function getAllFoldersWithGitConfig(folderPathBase: string) {
	const foldersFromDir = getAllFoldersInDir(folderPathBase);
	return foldersFromDir.filter((f) => checkFolderHasGitConfig(f));
}

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
	return checkFolderHasFolder(folderPath, GIT_NAME_FOLDER_CONFIG);
}

export async function runCommand(command: string) {
	try {
		await vscode.commands.executeCommand(command);
	} catch (e) {
		vscode.window.showErrorMessage(
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

export async function runGitCommand(command: string, workDir?: string) {
	const commandWithMaybeWorkDir = `git ${command} ${workDir ? `-C ${workDir}` : ''}`;
	await runCommand(commandWithMaybeWorkDir);
}

export async function runGitPullOnFolders(foldersPathWithGitConfig: Array<string>) {
	for (const folder in foldersPathWithGitConfig) {
		await runGitCommand(GIT_COMMANDS.pull, folder);
	}
}
