<template>
	<i class="vc-icon" @click="$emit('click', $event)">
		<svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg">
			<path 
				v-for="(it, i) in path"
				:key="i" 
				:d="it.d" 
				:fill="it.fill"
			/>
		</svg>
	</i>
</template>
<script>
import str from './svg';

let basicReg = /.*id="icon-([^"]+).*viewBox="([^"]+)(.*)/g;
let symbolReg = /<symbol.*?<\/symbol>/gi;
let pathReg = /<path.*?<\/path>/gi;
let dReg = /.*d="([^"]+).*/g;
let fillReg = /.*fill="([^"]+).*/g;

let source = {};

try {
	str.match(symbolReg).forEach( 
		i => i.replace(basicReg, function (_, $1, $2, $3) {
			source[`${$1}`] = {
				viewBox: $2,
				path: $3.match(pathReg).map(j => ({
					d: j.replace(dReg, '$1'),
					fill: fillReg.test($3) ? j.replace(fillReg, '$1') : ''
				}))
			};
		})
	);
} catch (e) {
	console.log(e);
}



export default {
	name: "vc-icon",
	props: {
		type: String,
	},
	data() {
		return {
		};
	},
	computed: {
		viewBox() {
			return source[this.type] && source[this.type].viewBox;
		},
		path() {
			return source[this.type] && source[this.type].path;
		}
	},
	methods: {
	}
};
</script>
<style>
.vc-icon {
	display: inline-block;
	line-height: 0;
}
.vc-icon svg {
	width: 1em;
	height: 1em;
	fill: currentColor;
	overflow: hidden;
}
</style>