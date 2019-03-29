<template>
	<div>
		<h1>点击复制</h1>
		<div class="vc-icon-basic">
			<span v-for="item in items" :key="item" >
				<vc-icon :type="item"/>
				<vc-copy :value="`<vc-icon type=&quot;${item}&quot; />`">{{ item }}</vc-copy>
			</span>
		</div>
	</div>
</template>
<script>
import Icon from '../icon';
import Copy from '../../copy';
import all from '../svg';

export default {
	name: "vc-icon-basic",
	components: {
		'vc-icon': Icon,
		'vc-copy': Copy
	},
	data() {
		return {
			items: all.match(/id="icon-(\S{1,})"/g).map(i => i.replace(/("|id="icon-)/g, ""))
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
<style>
.vc-icon-basic {
	display: flex;
	flex-wrap: wrap;
	span {
		width: 200px;
		padding: 20px;
		text-align: center;
	}
	i {
		font-size: 30px
	}
}
</style>
