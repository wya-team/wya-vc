import {
	createVue,
	createComponent,
	destroyVM,
	wait,
	triggerEvent
} from "@tests/helper";
import { ajax } from "@wya/http";
import { initPage, URL } from "@wya/utils";
import Paging from '..';
import Table from "../../table";
import Tabs from "../../tabs";


describe('Paging', () => {
	it('basic', () => {
		expect(typeof Paging).to.equal("object");
	});

	it("normal", async () => {
		let vm = createVue({
			template: `<vc-paging
			 	ref="page"
				:data-source="listInfo.data"
				:load-data="loadData"
				:total="listInfo.total"
				:count="listInfo.count"
				:reset="listInfo.reset"
				:page-opts="page"
				:table-opts="table"
				:history="true"
				:sync="true"
				:show.sync="show"
				:row-key.sync="rowKey"
				style="width: 100%"
				@page-size-change="handleResetFirst"
			>
				<vc-table-item>
					<vc-table-column
						type="selection"
						width="40"
					/>
					<vc-table-column
						prop="date"
						label="日期"
						width="180"
					/>
					<vc-table-column
						prop="name"
						label="姓名"
						width="180"
					/>
					<vc-table-column
						prop="address"
						label="地址"
					/>
				</vc-table-item>
				<template #loading>
					<div>loading</div>
				</template>
			</vc-paging>`,
			components: {
				"vc-paging": Paging,
				"vc-table-item": Table.Item,
				"vc-table-column": Table.Column
			},
			data() {
				return {
					show: true,
					listInfo: {
						...initPage
					},
					page: undefined,
					table: undefined,
					rowKey: "id"
				};
			},
			methods: {
				loadData(page, pageSize) {
					return ajax({
						url: "test.json",
						localData: {
							status: 1,
							data: {
								page: {
									current: page,
									total: 100,
									count: pageSize * 100
								},
								list: this.getFakeData(page, pageSize)
							}
						}
					})
						.then(res => {
							this.listInfo = {
								...this.listInfo,
								...res.data.page,
								data: {
									...this.listInfo.data,
									[page]: res.data.list
								}
							};
						})
						.catch(e => {
							console.log(e);
						});
				},
				getFakeData(page, pageSize) {
					let fakeData = [];
					for (let i = 0; i < pageSize; i++) {
						fakeData.push({
							id: `${page}_${i}`,
							name:
								page
								+ "-Business"
								+ Math.floor(Math.random() * 100 + 1),
							status: Math.floor(Math.random() * 3 + 1),
							opt: Math.floor(Math.random() * 3 + 1),
							date: "2016-05-02",
							address: "上海市普陀区金沙江路 1518 弄"
						});
					}
					return fakeData;
				},
				/**
				 * 回到首页刷新
				 */
				handleResetFirst() {
					this.listInfo = {
						...initPage
					};
				},
				/**
				 * 当前页刷新
				 */
				handleResetCur() {
					this.listInfo = {
						...initPage,
						reset: true
					};
				}
			}
		});
		let parent = vm.$el.parentNode;
		await wait(0.1);
		vm.$refs.page.go();
		vm.$el.querySelector("input").click();
		await wait(0.1);
		vm.$refs.page.go(2);
		await wait(0.1);
		vm.$el.querySelectorAll("input")[0].click();
		await wait(0.1);
		vm.$el.querySelector(".vc-select").click();
		await wait(1);
		parent.querySelectorAll(".vc-select-option")[2].click();
		expect(vm.$refs.page.pageSize).to.equal(30);
		await wait(0.5);
		vm.rowKey = "";
		await wait(1);
		vm.$refs.page.go(1);
		vm.$el.querySelectorAll("input")[1].click();
		expect(vm.$refs.page.currentPage).to.equal(1);
		vm.show = false;
		await wait(1);
		vm.show = true;
		await wait(1);
		destroyVM(vm);
	});

	it("piece", async () => {
		let vm = createVue({
			template:
			`<vc-paging
				ref="page"
				:data-source="listInfo.data"
				:total="listInfo.total"
				:reset="listInfo.reset"
				:page-opts="page"
				:table-opts="table"
				:history="false"
				:load-data="loadData"
				:show="show"
				mode="piece"
				class="v-paging-piece"
				@page-size-change="handleResetFirst"
			>
				<template #default="{ it }">
					<div :key="it.id" class="_item">
						<div>{{ it.name }}</div>
						<div @click="handleResetFirst">
							回到首页刷新
						</div>
						<div @click="handleResetCur">
							当前页刷新
						</div>
					</div>
				</template>
			</vc-paging>`,
			components: {
				"vc-paging": Paging,
				"vc-table-item": Table.Item,
				"vc-table-column": Table.Column
			},
			data() {
				return {
					show: false,
					listInfo: {
						...initPage
					},
					page: undefined,
					table: {
						"disabled-hover": true,
						style: "margin: 20px"
					}
				};
			},
			methods: {
				loadData(page, pageSize) {
					return ajax({
						url: "test.json",
						localData: {
							status: 1,
							data: {
								page: {
									current: page,
									total: 100,
									count: pageSize * 100
								},
								list: this.getFakeData(page, pageSize)
							}
						}
					})
						.then(res => {
							this.listInfo = {
								...this.listInfo,
								...res.data.page,
								data: {
									...this.listInfo.data,
									[page]: res.data.list
								}
							};
						})
						.catch(e => {
							console.log(e);
						});
				},
				getFakeData(page, pageSize) {
					let fakeData = [];
					for (let i = 0; i < pageSize; i++) {
						fakeData.push({
							id: `${page}_${i}`,
							name:
								page
								+ "-Business"
								+ Math.floor(Math.random() * 100 + 1),
							status: Math.floor(Math.random() * 3 + 1),
							opt: Math.floor(Math.random() * 3 + 1),
							date: "2016-05-02",
							address: "上海市普陀区金沙江路 1518 弄"
						});
					}
					return fakeData;
				},
				/**
				 * 回到首页刷新
				 */
				handleResetFirst() {
					this.listInfo = {
						...initPage
					};
				},
				/**
				 * 当前页刷新
				 */
				handleResetCur() {
					this.listInfo = {
						...initPage,
						reset: true
					};
				}
			}
		});
		vm.$refs.page.go(2);
		destroyVM(vm);
	});

	it("load fail", async () => {
		let count = 0;
		let vm = createVue({
			template: `<vc-paging
			 	ref="page"
				:data-source="listInfo.data"
				:load-data="loadData"
				:total="listInfo.total"
				:count="listInfo.count"
				:reset="listInfo.reset"
				:page-opts="page"
				:table-opts="table"
				:history="false"
				:show.sync="show"
				:row-key.sync="rowKey"
				style="width: 100%"
				@page-size-change="handleResetFirst"
				@load-fail="loadFail"
			>
				<vc-table-item>
					<vc-table-column
						type="selection"
						width="40"
					/>
					<vc-table-column
						prop="date"
						label="日期"
						width="180"
					/>
					<vc-table-column
						prop="name"
						label="姓名"
						width="180"
					/>
					<vc-table-column
						prop="address"
						label="地址"
					/>
				</vc-table-item>
				<template #loading>
					<div>loading</div>
				</template>
			</vc-paging>`,
			components: {
				"vc-paging": Paging,
				"vc-table-item": Table.Item,
				"vc-table-column": Table.Column
			},
			data() {
				return {
					show: true,
					listInfo: {
						...initPage
					},
					page: undefined,
					table: undefined,
					rowKey: "id"
				};
			},
			methods: {
				loadData() {
					return new Promise((resolve, reject) => {
						setTimeout(reject, 500);
					});
				},
				loadFail() {
					count++;
				},
				/**
				 * 回到首页刷新
				 */
				handleResetFirst() {
					this.listInfo = {
						...initPage
					};
				},
				/**
				 * 当前页刷新
				 */
				handleResetCur() {
					this.listInfo = {
						...initPage,
						reset: true
					};
				}
			}
		});
		await wait(1);
		expect(count).to.equal(1);
		destroyVM(vm);
	});

	it("load error", async () => {
		let vm = createVue({
			template: `<vc-paging
			 	ref="page"
				:data-source="listInfo.data"
				:load-data="loadData"
				:total="listInfo.total"
				:count="listInfo.count"
				:reset="listInfo.reset"
				:page-opts="page"
				:table-opts="table"
				:history="true"
				:show.sync="show"
				:row-key.sync="rowKey"
				style="width: 100%"
				@page-size-change="handleResetFirst"
			>
				<vc-table-item>
					<vc-table-column
						type="selection"
						width="40"
					/>
					<vc-table-column
						prop="date"
						label="日期"
						width="180"
					/>
					<vc-table-column
						prop="name"
						label="姓名"
						width="180"
					/>
					<vc-table-column
						prop="address"
						label="地址"
					/>
				</vc-table-item>
				<template #loading>
					<div>loading</div>
				</template>
			</vc-paging>`,
			components: {
				"vc-paging": Paging,
				"vc-table-item": Table.Item,
				"vc-table-column": Table.Column
			},
			data() {
				return {
					show: true,
					listInfo: {
						...initPage
					},
					page: undefined,
					table: undefined,
					rowKey: "id"
				};
			},
			methods: {
				loadData() {
					return null;
				},
				/**
				 * 回到首页刷新
				 */
				handleResetFirst() {
					this.listInfo = {
						...initPage
					};
				},
				/**
				 * 当前页刷新
				 */
				handleResetCur() {
					this.listInfo = {
						...initPage,
						reset: true
					};
				}
			}
		});
		expect(vm.listInfo.data).to.equal(undefined);
		destroyVM(vm);
	});

});
