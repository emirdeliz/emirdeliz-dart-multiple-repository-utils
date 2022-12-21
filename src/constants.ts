export const FLUTTER_NAME_FILE_CONFIG = 'pubspec.yaml';
export const FLUTTER_NAME_FILE_CONFIG_LOCK = 'pubspec.lock';
export const COMMAND_DELETE_PUBSPEC_LOCK = `rm -rf ${FLUTTER_NAME_FILE_CONFIG_LOCK}`;
export const FLUTTER_COMMAND_PUB_GET = 'flutter pub get';
export const FLUTTER_COMMAND_CLEAN = `${COMMAND_DELETE_PUBSPEC_LOCK} && flutter clean`;
export const SETTINGS_KEY_BASE = 'emirdeliz-dart-multiple-repository-utils';
export const SETTINGS_KEY_DART_IGNORE_FOLDERS = 'ignore-folders';

export enum FLUTTER_TYPE_COMMANDS {
	Clean = 'clean',
	PubGet = 'pub-get',
}

export const FLUTTER_COMMANDS = {
	[FLUTTER_TYPE_COMMANDS.Clean]: FLUTTER_COMMAND_CLEAN,
	[FLUTTER_TYPE_COMMANDS.PubGet]: FLUTTER_COMMAND_PUB_GET,
};
