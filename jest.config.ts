/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from 'jest';

const config = {
	verbose: true,
	// A map from regular expressions to paths to transformers
	transform: {
		'^.+\\.(t|j)s?$': '@swc/jest',
	},
	// The glob patterns Jest uses to detect test files.
	testMatch: ['<rootDir>/src/test/**/*.test.ts'],
	// A map from regular expressions to module names or to arrays of module names that allow to stub out resources,
	// like images or styles with a single module.
	moduleNameMapper: {
		'^vscode$': '<rootDir>/src/test/__mocks__/vscode.ts',
	},
	modulePathIgnorePatterns: ['<rootDir>/dist'],
} as Config;

export default config;
