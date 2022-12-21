import * as fs from 'fs';
import * as vscode from 'vscode';
import * as constants from 'emirdeliz-vs-extension-utils/dist/constants';

export const window = {
	createTerminal: function () {
		return {
			name: `${constants.EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME} #0000`,
			sendText: function (command: string) {
				window.sendText(command);
			},
		};
	},
	showErrorMessage: jest.fn(),
	showWarningMessage: jest.fn(),
	withProgress: function (
		_progress: vscode.ProgressOptions,
		callback: (
			progress: Progress<{ message?: string; increment?: number }>
		) => void
	) {
		callback({
			report: window.report,
		});
	},
	sendText: jest.fn(),
	report: function () {
		jest.fn();
	},
};

export interface WorkspaceFolder {
	readonly uri: vscode.Uri;
	readonly name: string;
	readonly index: number;
}

export const workspace = {
	findFiles: function (include: vscode.GlobPattern) {
		return Promise.resolve({
			entries: function () {
				return {
					next: function () {
						return fs.existsSync(include.toString());
					},
				};
			},
		});
	},
	getConfiguration: function () {
		return {
			get: function (settingKey: string) {
				switch (settingKey) {
					case settingKey:
						return ['src/other-dir/code'];
					case 'ignoreFolders':
						return [];
					default:
						return [];
				}
			},
		};
	},
	workspaceFolders: fs
		.readdirSync(constants.EMIRDELIZ_TEST_WORKSPACE_PATH)
		.map(function (folder) {
			return {
				name: folder,
				uri: {
					fsPath: folder,
				},
			};
		}),
};

export const env = {
	clipboard: {
		readText: jest.fn(function () {
			return constants.EMIRDELIZ_TEST_WORKSPACE_FOLDER_FOCUS;
		}),
	},
};

const executeCommand = jest.fn(function (command: string) {
	switch (command) {
		case 'copyFilePath':
			return env.clipboard.readText();
		default:
			return command;
	}
});

export const commands = {
	executeCommand,
};

export enum ProgressLocation {
	SourceControl = 1,
	Window = 10,
	Notification = 15,
}

export interface Progress<T> {
	report(value: T): void;
}
