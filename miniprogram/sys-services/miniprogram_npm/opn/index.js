module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1637045277860, function(require, module, exports) {

const {promisify} = require('util');
const path = require('path');
const childProcess = require('child_process');
const isWsl = require('is-wsl');

const pExecFile = promisify(childProcess.execFile);

// Convert a path from WSL format to Windows format:
// `/mnt/c/Program Files/Example/MyApp.exe` → `C:\Program Files\Example\MyApp.exe``
const wslToWindowsPath = async path => {
	const {stdout} = await pExecFile('wslpath', ['-w', path]);
	return stdout.trim();
};

module.exports = async (target, options) => {
	if (typeof target !== 'string') {
		throw new TypeError('Expected a `target`');
	}

	options = {
		wait: false,
		...options
	};

	let command;
	let appArguments = [];
	const cliArguments = [];
	const childProcessOptions = {};

	if (Array.isArray(options.app)) {
		appArguments = options.app.slice(1);
		options.app = options.app[0];
	}

	if (process.platform === 'darwin') {
		command = 'open';

		if (options.wait) {
			cliArguments.push('-W');
		}

		if (options.app) {
			cliArguments.push('-a', options.app);
		}
	} else if (process.platform === 'win32' || isWsl) {
		command = 'cmd' + (isWsl ? '.exe' : '');
		cliArguments.push('/c', 'start', '""', '/b');
		target = target.replace(/&/g, '^&');

		if (options.wait) {
			cliArguments.push('/wait');
		}

		if (options.app) {
			if (isWsl && options.app.startsWith('/mnt/')) {
				const windowsPath = await wslToWindowsPath(options.app);
				options.app = windowsPath;
			}

			cliArguments.push(options.app);
		}

		if (appArguments.length > 0) {
			cliArguments.push(...appArguments);
		}
	} else {
		if (options.app) {
			command = options.app;
		} else {
			const useSystemXdgOpen = process.versions.electron || process.platform === 'android';
			command = useSystemXdgOpen ? 'xdg-open' : path.join(__dirname, 'xdg-open');
		}

		if (appArguments.length > 0) {
			cliArguments.push(...appArguments);
		}

		if (!options.wait) {
			// `xdg-open` will block the process unless stdio is ignored
			// and it's detached from the parent even if it's unref'd.
			childProcessOptions.stdio = 'ignore';
			childProcessOptions.detached = true;
		}
	}

	cliArguments.push(target);

	if (process.platform === 'darwin' && appArguments.length > 0) {
		cliArguments.push('--args', ...appArguments);
	}

	const subprocess = childProcess.spawn(command, cliArguments, childProcessOptions);

	if (options.wait) {
		return new Promise((resolve, reject) => {
			subprocess.once('error', reject);

			subprocess.once('close', exitCode => {
				if (exitCode > 0) {
					reject(new Error(`Exited with code ${exitCode}`));
					return;
				}

				resolve(subprocess);
			});
		});
	}

	subprocess.unref();

	return subprocess;
};

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1637045277860);
})()
//miniprogram-npm-outsideDeps=["util","path","child_process","is-wsl"]
//# sourceMappingURL=index.js.map