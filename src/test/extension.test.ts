import * as vscode from './__mocks__/vscode';
import * as extensionBase from '../extension';
import * as constants from '../constants';

jest.mock('fs');
const extension = { ...extensionBase };

function testRun(
	runSpy: jest.SpyInstance,
	types: Array<constants.FLUTTER_TYPE_COMMANDS>
) {
	const commandOneExpected = extension.buildCommand(types, {
		name: 'repoOne',
	} as vscode.WorkspaceFolder);
	const commandTwoExpected = extension.buildCommand(types, {
		name: 'repoTwo',
	} as vscode.WorkspaceFolder);
	expect(runSpy).toHaveBeenCalledTimes(2);
	expect(runSpy).toHaveBeenNthCalledWith(1, commandOneExpected);
	expect(runSpy).toHaveBeenNthCalledWith(2, commandTwoExpected);
}

function testReport(reportSpy: jest.SpyInstance) {
	expect(reportSpy).toHaveBeenCalledTimes(2);
	expect(reportSpy).toHaveBeenNthCalledWith(1, {
		increment: 50,
		message: 'Running on repoOne (1 of 2)',
	});

	expect(reportSpy).toHaveBeenNthCalledWith(2, {
		increment: 50,
		message: 'Running on repoTwo (2 of 2)',
	});
}

function testProgress(
	withProgressSpy: jest.SpyInstance,
	type: Array<constants.FLUTTER_TYPE_COMMANDS>
) {
	expect(withProgressSpy).toHaveBeenCalledTimes(1);
	expect(withProgressSpy).toHaveBeenCalledWith(
		expect.objectContaining({
			title: `Making ${type.join(', ')}... 🤘`,
		}),
		expect.any(Function)
	);
}

function testIgnoreFolders(
	runSpy: jest.SpyInstance,
	types: Array<constants.FLUTTER_TYPE_COMMANDS>
) {
	const commandExpected = extension.buildCommand(types, {
		name: 'repoTwo',
	} as vscode.WorkspaceFolder);
	expect(runSpy).toHaveBeenCalledTimes(types.length);
	expect(runSpy).toHaveBeenCalledWith(commandExpected);
}

describe('Commands', function () {
	beforeEach(function () {
		jest.clearAllMocks();
	});

	it('should return expected output when execute clean', async function () {
		const runSpy = jest.spyOn(vscode.window, 'sendText');
		const reportSpy = jest.spyOn(vscode.window, 'report');
		const withProgressSpy = jest.spyOn(vscode.window, 'withProgress');

		await extension.makeFlutterClean();

		testRun(runSpy, [constants.FLUTTER_TYPE_COMMANDS.Clean]);
		testProgress(withProgressSpy, [constants.FLUTTER_TYPE_COMMANDS.Clean]);
		testReport(reportSpy);
	});

	it('should return expected output when execute pub get', async function () {
		const runSpy = jest.spyOn(vscode.window, 'sendText');
		const reportSpy = jest.spyOn(vscode.window, 'report');
		const withProgressSpy = jest.spyOn(vscode.window, 'withProgress');

		await extension.makeFlutterPubGet();

		testRun(runSpy, [constants.FLUTTER_TYPE_COMMANDS.PubGet]);
		testProgress(withProgressSpy, [constants.FLUTTER_TYPE_COMMANDS.PubGet]);
		testReport(reportSpy);
	});

	it('should return expected output when execute clean & pub get', async function () {
		const runSpy = jest.spyOn(vscode.window, 'sendText');
		const reportSpy = jest.spyOn(vscode.window, 'report');
		const withProgressSpy = jest.spyOn(vscode.window, 'withProgress');

		await extension.makeFlutterCleanAndPubGet();

		const commands = [
			constants.FLUTTER_TYPE_COMMANDS.Clean,
			constants.FLUTTER_TYPE_COMMANDS.PubGet,
		];
		testRun(runSpy, commands);
		testProgress(withProgressSpy, commands);
		testReport(reportSpy);
	});

	it('should return expected output when execute clean, pub get and clean & pub get with ignoreFolders', async function () {
		const runSpy = jest.spyOn(vscode.window, 'sendText');
		jest.spyOn(vscode.workspace, 'getConfiguration').mockReturnValue({
			get: function () {
				return ['repoOne'];
			},
		});

		await extension.makeFlutterClean();
		testIgnoreFolders(runSpy, [constants.FLUTTER_TYPE_COMMANDS.Clean]);
		runSpy.mockReset();

		await extension.makeFlutterPubGet();
		testIgnoreFolders(runSpy, [constants.FLUTTER_TYPE_COMMANDS.PubGet]);

		const commands = [
			constants.FLUTTER_TYPE_COMMANDS.Clean,
			constants.FLUTTER_TYPE_COMMANDS.PubGet,
		];
		await extension.makeFlutterCleanAndPubGet();
		testIgnoreFolders(runSpy, commands);
	});

	it('should return expected output when execute buildCommand', async function () {
		let command = extension.buildCommand(
			[constants.FLUTTER_TYPE_COMMANDS.Clean],
			{
				name: 'repoOne',
			} as vscode.WorkspaceFolder
		);

		expect(command).toEqual(
			`cd repoOne && ${
				constants.FLUTTER_COMMANDS[constants.FLUTTER_TYPE_COMMANDS.Clean]
			} && cd..`
		);

		command = extension.buildCommand([constants.FLUTTER_TYPE_COMMANDS.PubGet], {
			name: 'repoOne',
		} as vscode.WorkspaceFolder);

		expect(command).toEqual(
			`cd repoOne && ${
				constants.FLUTTER_COMMANDS[constants.FLUTTER_TYPE_COMMANDS.PubGet]
			} && cd..`
		);

		command = extension.buildCommand(
			[
				constants.FLUTTER_TYPE_COMMANDS.Clean,
				constants.FLUTTER_TYPE_COMMANDS.PubGet,
			],
			{
				name: 'repoOne',
			} as vscode.WorkspaceFolder
		);

		expect(command).toEqual(
			`cd repoOne && ${
				constants.FLUTTER_COMMANDS[constants.FLUTTER_TYPE_COMMANDS.Clean]
			} && ${
				constants.FLUTTER_COMMANDS[constants.FLUTTER_TYPE_COMMANDS.PubGet]
			} && cd..`
		);
	});
});
