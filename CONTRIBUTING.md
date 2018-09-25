# 贡献指南

这篇指南会指导你如何为 `wya-vc` 贡献一份自己的力量，请在你要提 `issue` 或者 `pull request` 之前花几分钟来阅读一遍这篇指南。

## 行为准则

我们有一份 [行为准则](./CODE_OF_CONDUCT.md)，希望所有的贡献者都能遵守，请花时间阅读一遍全文以确保你能明白哪些是可以做的，哪些是不可以做的。

## 透明的开发

我们所有的工作都会放在 [`GitHub`](https://github.com/wya-team) 上。不管是核心团队的成员还是外部贡献者的 `pull request` 都需要经过同样流程的 `review`。

## 分支管理

基于我们的 [发布周期](./CHANGELOG.md)，我们每个月都会从 `master` 分支切一个 `feature` 分支出来（比如 `features-3.1` 分支用来发布 3.1 版本）。 如果你要修一个 `bug`，那么请发 `pull request` 到 `master`；如果你要提一个增加新功能的 `pull request`，那么请基于 `feature` 分支来做。

## Bugs

我们使用 [`GitHub Issues`](https://github.com/wya-team/wya-vc/issues) 来做 `bug` 追踪。

在你报告一个 `bug` 之前，请先确保已经搜索过已有的 `issue` 和阅读了我们的 [常见问题](https://github.com/wya-team/wya-vc/wiki/FAQ)。

## 新增功能

如果你有改进我们的 `API` 或者新增功能的想法，新建一个添加新功能的 `issue`。

## 第一次贡献

如果你还不清楚怎么在 `GitHub` 上提 `Pull Request` ，可以阅读下面这篇文章来学习：

[如何优雅地在 `GitHub` 上贡献代码](https://segmentfault.com/a/1190000000736629)

为了能帮助你开始你的第一次尝试，我们用 `good first issues` 标记了一些比较比较容易修复的 `bug` 和小功能。这些 `issue` 可以很好地做为你的首次尝试。

如果你打算开始处理一个 `issue`，请先检查一下 `issue` 下面的留言以确保没有别人正在处理这个 `issue`。如果当前没有人在处理的话你可以留言告知其他人你将会处理这个 `issue`，以免别人重复劳动。

如果之前有人留言说会处理这个 `issue` 但是一两个星期都没有动静，那么你也可以接手处理这个 `issue`，当然还是需要留言告知其他人。

## Pull Request

`WYA` 团队会关注所有的 `pull request`，我们会 `review` 以及合并你的代码，也有可能要求你做一些修改或者告诉你我们为什么不能接受这样的修改。

**在你发送 `Pull Request` 之前**，请确认你是按照下面的步骤来做的：

1. 基于 [正确的分支](/)来做修改。
2. 在项目根目录下运行了 `npm install`。
3. 如果你修复了一个 `bug` 或者新增了一个功能，请确保写了相应的测试，这很重要。
4. 确认所有的测试都是通过的 `npm run test`。 小贴士：开发过程中可以用 `npm test -- --watch TestName` 来运行指定的测试。
5. 运行 `npm test -- -u` 来更新 [`jest snapshot`](http://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest) 并且把这些更新也提交上来（如果有的话）。
6. 确保你的代码通过了 `lint` 检查 `npm run lint`. 小贴士: `Lint` 会在你 `git commit` 的时候自动运行。


## 开发流程

在你 `clone` 了 `wya-vc`  的代码并且使用 `npm install` 安装完依赖后，你还可以运行下面几个常用的命令：

1. `npm start` 或者 `npm run dev` 在本地运行 `wya-vc`。
2. `npm run lint` / `npm run lint:fix` / `npm run lint:watch` 检查代码风格/修复/监听。
3. `npm run build:dev` / `npm run build` 构建 `wya-vc` 到 `dist` 目录。
4. `npm run mock` 运行数据模拟。
5. `npm test` 运行测试。
