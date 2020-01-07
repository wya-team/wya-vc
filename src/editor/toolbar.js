import defaultOptions from './default-options';

const toolMap = {
	size: ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '50px'],
	header: [1, 2, 3, 4, 5, 6, 'selected'],
	// selected 有无好像没有影响
	color: [
		"selected", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", 
		"#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", 
		"#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", 
		"#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", 
		"#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", 
		"#663d00", "#666600", "#003700", "#002966", "#3d1466"
	],
	background: [
		"#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", 
		"#9933ff", "selected", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", 
		"#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", 
		"#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", 
		"#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", 
		"#663d00", "#666600", "#003700", "#002966", "#3d1466"
	],
	font: ['selected', 'serif', 'monospace'],
	align: ['selected', 'center', 'right', 'justify']
};

export default {
	name: 'vc-editor-toolbar',
	props: {
		toolbar: {
			type: [Array, Object, String],
			default: '#toolbar'
		},
		initFontSize: Function
	},
	data() {
		return {};
	},
	computed: {
		buttons() {
			let array = defaultOptions.modules.toolbar;
			if (this.toolbar instanceof Array) {
				array = this.toolbar;
			} else if (typeof this.toolbar === 'object' && this.toolbar.container instanceof Array) {
				array = this.toolbar.container;
			}
			
			return array;
		}
	},
	created() {
		this.fontSize = [];
	},
	render(h) {
		const { buttons } = this;
		const renderGroup = (array) => {
			return array.map((item) => {
				if (typeof item === 'string') {
					if (item.includes('vc')) {
						switch (item) {
							case 'vc-image':
								return this.$slots.default[0];
							case 'vc-video':
								return this.$slots.default[2];
							case 'vc-undo':
								return this.$slots.default[4];
							case 'vc-redo':
								return this.$slots.default[6];
							default:
								return null;
						}
					}
					return <button class={`ql-${item}`} />;
				}
				if (item instanceof Array) {
					return (
						<span class="ql-formats">
							{renderGroup(item)}
						</span>
					);
				}
				if (typeof item === 'object') {
					let [key, value] = Object.entries(item)[0];
					if (typeof value === 'string') {
						return <button class={`ql-${key}`} value={value} />;
					} 
					if (value instanceof Array) {
						let options = value || toolMap[key];
						key === 'size' && (this.fontSize = value);
						
						return (
							<select class={`ql-${key}`}>
								{options.map((it) => {
									if (it === 'selected' || !it) {
										return <option selected="selected" />;
									}
									return <option value={`${it}`} />;
								})}
							</select>
						);
					}
					return null;
				}
				return null;
			});
		};

		return (
			<div id="toolbar">
				{renderGroup(buttons)}
				{this.$slots.extend}
			</div>
		);
	}
};