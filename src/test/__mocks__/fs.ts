export function existsSync(filePath: string) {
	return (
		(filePath.includes('repoOne') || filePath.includes('repoTwo')) &&
		!filePath.includes('core')
	);
}

export function readdirSync() {
	return ['data', 'extension', 'repoOne', 'repoTwo', 'swc'];
}

export function statSync() {
	return {
		isDirectory: function () {
			return true;
		},
	};
}
