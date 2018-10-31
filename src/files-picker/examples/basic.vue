<template>
	<vc-files-picker 
		:upload="{multiple: true}"
	>
		<!-- <template slot-scope="slotProps">
			<div v-for="(item, index) in slotProps.files" :key="index">
				{{ item }}
			</div>
		</template> -->
	</vc-files-picker>
</template>
<script>
import FilesPicker from '../files-picker';
import { VcInstance } from '../../vc/index';

VcInstance.init({
	Upload: {
		URL_UPLOAD_IMG_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadimage&encode=utf-8&code=oa',
		URL_UPLOAD_FILE_POST: 'https://wyaoa-new.ruishan666.com/uploadfile/upimg.json?action=uploadfile&encode=utf-8&code=oa'
	}
});

export default {
	name: "vc-files-picker-basic",
	components: {
		"vc-files-picker": FilesPicker
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
