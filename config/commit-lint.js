const fs = require('fs-extra');

const commitRE = /^(revert: )?(fix|feat|docs|perf|test|types|build|chore|refactor|breaking change)(\(.+\))?: .{1,50}/;
const mergeRE = /Merge branch /;

const gitParams = process.env.HUSKY_GIT_PARAMS;
const commitMsg = fs.readFileSync(gitParams, 'utf-8').trim();

if (!commitRE.test(commitMsg) && !mergeRE.test(commitMsg)) {
	console.error(
		`invalid commit message: "${commitMsg}".

		Examples: 

		- fix(Button): incorrect style
		- feat(Button): incorrect style
		- docs(Button): fix typo

		Allowed Types:
		
		- fix：修补bug
		- feat：新功能（feature）
		- docs：文档（documentation）
		- test：增加测试
		- chore：构建过程或辅助工具的变动
		- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
		- perf
		- types
		- build
		- breaking change
		- Merge branch 'foo' into 'bar'
		`
	);
	process.exit(1);
}
