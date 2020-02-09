"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importDefault(require("../src"));
const createInstance = (functions, globalRuntime) => ({
    cli: {
        log: jest.fn()
    },
    config: {
        servicePath: 'servicePath'
    },
    service: {
        provider: {
            name: 'aws',
            runtime: globalRuntime
        },
        package: {
            individually: true,
            include: [],
            exclude: []
        },
        functions,
        getAllFunctions: jest.fn()
    },
    pluginManager: {
        spawn: jest.fn()
    }
});
describe('functions', () => {
    const functions = {
        hello: {
            handler: 'tests/assets/hello.handler',
            package: {
                include: [],
                exclude: []
            }
        },
        world: {
            handler: 'tests/assets/world.handler',
            runtime: 'nodejs12.x',
            package: {
                include: [],
                exclude: []
            },
        },
        js: {
            handler: 'tests/assets/jsfile.create',
            package: {
                include: [],
                exclude: []
            }
        },
        notActuallyTypescript: {
            handler: 'tests/assets/jsfile.create',
            package: {
                include: [],
                exclude: []
            },
            runtime: 'go1.x'
        },
    };
    describe('when the provider runtime is Node', () => {
        it('can get filter out non node based functions', () => {
            const slsInstance = createInstance(functions, 'nodejs10.x');
            const plugin = new src_1.default(slsInstance, {});
            expect(Object.values(plugin.functions).map(fn => fn.handler)).toEqual([
                'tests/assets/hello.handler',
                'tests/assets/world.handler',
                'tests/assets/jsfile.create',
            ]);
        });
    });
    describe('when the provider runtime is not Node', () => {
        it('can get filter out non node based functions', () => {
            const slsInstance = createInstance(functions, 'python2.7');
            const plugin = new src_1.default(slsInstance, {});
            expect(Object.values(plugin.functions).map(fn => fn.handler)).toEqual([
                'tests/assets/world.handler',
            ]);
        });
    });
    describe('when the provider runtime is undefined', () => {
        it('can get filter out non node based functions', () => {
            const slsInstance = createInstance(functions);
            const plugin = new src_1.default(slsInstance, {});
            expect(Object.values(plugin.functions).map(fn => fn.handler)).toEqual([
                'tests/assets/hello.handler',
                'tests/assets/world.handler',
                'tests/assets/jsfile.create',
            ]);
        });
    });
});
//# sourceMappingURL=index.functions.test.js.map