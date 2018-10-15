<script>
const weekNames = [
	{ ch: "日", en: "Sun" },
	{ ch: "一", en: "Mon" },
	{ ch: "二", en: "Tue" },
	{ ch: "三", en: "Wed" },
	{ ch: "四", en: "Thu" },
	{ ch: "五", en: "Fri" },
	{ ch: "六", en: "Sta" }
];
export default {
	name: "vcp-calendar-header",
	props: {
		weekRender: Function,
		lan: {
			type: String,
			default: "ch"
		}
	},
	computed: {
		monthName() {
			return monthNames[this.month].ch;
		}
	},
	render(h) {
		if (this.weekRender) {
			return this.weekRender();
		} else {
			return (
				<div class="_title">
					{weekNames.map((item, index) => {
						return <span key={index}>{item[this.lan]}</span>;
					})}
				</div>
			);
		}
	}
};
</script>
<style lang="scss" scoped>
._title {
  display: flex;
  width: 100%;
  align-items: center;
  color: gray;
  padding: 15px 0;
  font-size: 16px;
  > span {
    width: 14.28%;
    text-align: center;
  }
}
</style>