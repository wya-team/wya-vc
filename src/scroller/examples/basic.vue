<template>
	<div style="padding: 20px">
		<h1 @click="always = !always">
			always: {{ always }}
		</h1>
		<h1 @click="native = !native">
			native: {{ native }}
		</h1>
		<h2>Height</h2>
		<vc-scroller 
			height="200px" 
			:always="always" 
			:native="native"
		>
			<p 
				v-for="item in 2000" 
				:key="item"
			>
				{{ item }}
			</p>
		</vc-scroller>
		<h2>Vertical</h2>
		<vc-scroller :always="always" :native="native">
			<div style="display: flex;">
				<p 
					v-for="item in 50" 
					:key="item"
					class="is-vertical"
				>
					{{ item }}
				</p>
			</div>
		</vc-scroller>

		<h2>MaxHeight</h2>
		<vc-scroller max-height="200px" :always="always" :native="native">
			<p 
				v-for="item in 20" 
				:key="item"
			>
				{{ item }}
			</p>
		</vc-scroller>

		<h2>X+Y</h2>
		<vc-scroller max-height="200px" :always="always" :native="native">
			<div style="display: flex; flex-direction: column;">
				<p 
					v-for="item in 20" 
					:key="item"
					style="flex: 1"
				>
					{{ item }}
				</p>
			</div>
			<div style="display: flex;">
				<p 
					v-for="item in 50" 
					:key="item"
					class="is-vertical"
				>
					{{ item }}
				</p>
			</div>
		</vc-scroller>
		<h2>Nested</h2>
		<vc-scroller height="200px" :always="always" :native="native">
			<p 
				v-for="item in 20" 
				:key="item"
			>
				{{ item }}
			</p>
			<div style="padding:0 100px">
				<vc-scroller height="200px" :always="always" :native="native">
					<p 
						v-for="item in 20" 
						:key="item"
					>
						{{ item }}
					</p>
				</vc-scroller>
			</div>
		</vc-scroller>

		<h2>Auto</h2>
		<vc-scroller>
			<p 
				v-for="item in 20" 
				:key="item"
			>
				{{ item }}
			</p>
		</vc-scroller>
	</div>
</template>
<script>
import Scroller from '..';

export default {
	name: "vc-srcoller-basic",
	components: {
		'vc-scroller': Scroller
	},
	data() {
		return {
			always: true,
			native: false
		};
	}
};
</script>

<style>
p {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50px;
	margin: 10px 0px;
	text-align: center;
	border-radius: 4px;
	background: #ecf5ff;
	color: #409eff;
	width: 100%;
}

p.is-vertical {
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	height: 50px;
	margin: 10px;
	text-align: center;
	border-radius: 4px;
	background: #fef0f0;
	color: #f56c6c;
}
</style>
