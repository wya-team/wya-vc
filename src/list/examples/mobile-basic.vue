<template>
	<div>
		<vcm-list :label-width="100" style="margin: 20px 0;">
			<vcm-list-item :arrow="false" label="姓名">
				<template #label="">
					<div/>
				</template>
				<template #extra="">
					<div>2</div>
				</template>
			</vcm-list-item>
			<vcm-list-item label="姓名" extra="啦啦啦" />
			<vcm-list-item :arrow="false" label="姓名" extra="啦啦啦" />
		</vcm-list>
		<vcm-list-item :arrow="true" label="姓名">
			<template #extra="">
				<div>alone</div>
			</template>
		</vcm-list-item>
		<br>
		<br>
		<br>
		<br>
		<!-- 鬼畜嵌套 -->
		<vcm-form>
			<vcm-list :border="false" :indent="0">
				<vcm-form-item>
					<vcm-list-item :arrow="true" label="姓名">
						<template #label="">
							<div>鬼畜嵌套</div>
						</template>
					</vcm-list-item>
				</vcm-form-item>
				<vcm-form-item>
					<vcm-list-item :arrow="true" label="姓名">
						<template #label="">
							<div>鬼畜嵌套</div>
						</template>
					</vcm-list-item>
				</vcm-form-item>
			</vcm-list>
		</vcm-form>
		<br>
		<br>
		<br>
		<br>
		<!-- 鬼畜嵌套 -->
		<vcm-form>
			<vcm-form-item>
				<vcm-list-item :arrow="true" label="姓名">
					<template #label="">
						<div>鬼畜嵌套</div>
					</template>
				</vcm-list-item>
			</vcm-form-item>
			<vcm-form-item>
				<vcm-list-item :arrow="true" label="姓名">
					<template #label="">
						<div>鬼畜嵌套</div>
					</template>
				</vcm-list-item>
			</vcm-form-item>
		</vcm-form>
		<br>
		<br>
		<br>
		<br>
		<vcm-form border>
			<vcm-form-item>
				<div>鬼畜嵌套</div>
			</vcm-form-item>
			<vcm-form-item>
				<div>鬼畜嵌套</div>
				<div>鬼畜嵌套</div>
				<div>鬼畜嵌套</div>
				<div>鬼畜嵌套</div>
				<div>鬼畜嵌套</div>
				<div>鬼畜嵌套</div>
				<div>鬼畜嵌套</div>
				<div>鬼畜嵌套</div>
				<div>鬼畜嵌套</div>
				<div>鬼畜嵌套</div>
			</vcm-form-item>
		</vcm-form>
	</div>
</template>
<script>
import List from '../index.m';
import Form from '../../form/index.m';

export default {
	name: "vcm-tpl-basic",
	components: {
		'vcm-list': List,
		'vcm-list-item': List.Item,
		'vcm-form': Form,
		'vcm-form-item': Form.Item,
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
