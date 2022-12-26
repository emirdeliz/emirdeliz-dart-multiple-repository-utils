import * as vscode from 'vscode';
import * as utils from 'emirdeliz-vs-extension-utils';
import * as constants from './constants';

export async function checkFolderHasDartConfig(folderPath: string) {
	return await utils.checkFolderHasFolder(
		folderPath,
		constants.FLUTTER_NAME_FILE_CONFIG
	);
}

export async function getAllFoldersWithDartConfig() {
	const workspaceFolders = utils.getWorkspaceFolders();
	const ignoreFolders = utils.getSettingsByKey<Array<string>>(
		constants.SETTINGS_KEY_BASE,
		constants.SETTINGS_KEY_DART_IGNORE_FOLDERS
	);

	const workspaceFoldersWithoutIgnoreFolders = workspaceFolders.reduce(
		function (result, folder) {
			const isFolderToIgnore =
				ignoreFolders && ignoreFolders.includes(folder.name);
			return isFolderToIgnore ? result : [...result, folder];
		},
		[] as ReadonlyArray<vscode.WorkspaceFolder>
	);

	const workspaceFoldersResult = [] as Array<vscode.WorkspaceFolder>;
	for (const folder of workspaceFoldersWithoutIgnoreFolders) {
		const hasDartConfig = await checkFolderHasDartConfig(folder.uri.fsPath);
		if (hasDartConfig) {
			workspaceFoldersResult.push(folder);
		}
	}
	return workspaceFoldersResult;
}

export function buildCommand(
	commands: Array<constants.FLUTTER_TYPE_COMMANDS>,
	currentFolder: vscode.WorkspaceFolder
) {
	const commandInitial = `cd ${currentFolder.name}`;
	const result = commands.reduce(function (result, commandType) {
		const command = constants.FLUTTER_COMMANDS[commandType];
		return `${result} && ${command}`;
	}, commandInitial);
	return `${result} && cd..`;
}

export async function runDartCommand(
	commands: Array<constants.FLUTTER_TYPE_COMMANDS>,
	foldersWithDartConfig: Array<vscode.WorkspaceFolder>
) {
	return utils.runCommandWithProgressNotification({
		commandType: commands.join(', '),
		foldersToCommandRun: foldersWithDartConfig,
		processCommand: async function (currentFolder: vscode.WorkspaceFolder) {
			const command = buildCommand(commands, currentFolder);
			await utils.runCommandOnVsTerminal(command);
		},
	});
}

export async function makeFlutterClean() {
	const foldersWithDartConfig = await getAllFoldersWithDartConfig();
	await runDartCommand(
		[constants.FLUTTER_TYPE_COMMANDS.Clean],
		foldersWithDartConfig
	);
}

export async function makeFlutterPubGet() {
	const foldersWithDartConfig = await getAllFoldersWithDartConfig();
	await runDartCommand(
		[constants.FLUTTER_TYPE_COMMANDS.PubGet],
		foldersWithDartConfig
	);
}

export async function makeFlutterCleanAndPubGet() {
	const foldersWithDartConfig = await getAllFoldersWithDartConfig();
	await runDartCommand(
		[
			constants.FLUTTER_TYPE_COMMANDS.Clean,
			constants.FLUTTER_TYPE_COMMANDS.PubGet,
		],
		foldersWithDartConfig
	);
}

export function activate(context: vscode.ExtensionContext) {
	console.debug(
		`Congratulations, your extension "$constants.SETTINGS_KEY_BASE}" is now active!`
	);

	const disposableFlutterCleanWorkspace = vscode.commands.registerCommand(
		'emirdeliz-dart-multiple-repository-utils.clean-workspace',
		makeFlutterClean
	);

	const disposableFlutterPubGetWorkspace = vscode.commands.registerCommand(
		'emirdeliz-dart-multiple-repository-utils.pub-get-workspace',
		makeFlutterPubGet
	);

	const disposableCleanPubGetWorkspace = vscode.commands.registerCommand(
		'emirdeliz-dart-multiple-repository-utils.clean-pub-get-workspace',
		makeFlutterPubGet
	);

	context.subscriptions.push(disposableFlutterCleanWorkspace);
	context.subscriptions.push(disposableFlutterPubGetWorkspace);
	context.subscriptions.push(disposableCleanPubGetWorkspace);
}
