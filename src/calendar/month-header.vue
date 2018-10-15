<script>
const monthNames = [
	{ ch: "一月", en: "January" },
	{ ch: "二月", en: "February" },
	{ ch: "三月", en: "March" },
	{ ch: "四月", en: "April" },
	{ ch: "五月", en: "May" },
	{ ch: "六月", en: "June" },
	{ ch: "七月", en: "July" },
	{ ch: "八月", en: "August" },
	{ ch: "九月", en: "September" },
	{ ch: "十月", en: "October" },
	{ ch: "十一月", en: "November" },
	{ ch: "十二月", en: "December" }
];
export default {
	name: "vcp-calendar-header",
	props: {
		monthRender: Function,
		year: Number,
		month: Number,
		lan: { type: String,
			default: 'ch'
		}
	},
	computed: {
		monthName() {
			return monthNames[this.month][this.lan];
		}
	},
	render(h) {
		if (this.monthRender) {
			return this.monthRender({ year: this.year, month: this.month, monthNames });
		} else {
			return (
				<div class="month-header">
					<div>
						{this.monthName} &nbsp;&nbsp;&nbsp;&nbsp;
						{this.year}
					</div>
				</div>
			);
		}
	}
};
</script>
<style lang="scss" scoped>
.month-header {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 60px;
  font-size: 24px;
  background-color: #f5f6f7;
  color: #2e3136;
}
</style>
