import {pathsToModuleNameMapper} from 'ts-jest/utils'
import {compilerOptions} from './tsconfig.json'


export default {
    bail: true,
    clearMocks: true,
    coverageProvider: "v8",
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
       prefix: "<rootDir>/src/" 
    }),
    collectCoverage: true,
    collectCoverageFrom: [
        "<rootDir>/src/modules/**/useCases/**/*.ts"
    ],
    coverageDirectory: 'coverage',
    coverageReporters: [
        "lcov",
        "text-summary"
    ],
    preset: 'ts-jest',
    testEnvironment: "node",
    testMatch: ["**/*.spec.ts"],
};
