<script>
const curDate = new Date();
function formatNum(num) {
	if (num < 10) {
		return "0" + num;
	}
	return num;
}
const curDateStr = `${curDate.getFullYear()}-${formatNum(curDate.getMonth() + 1)}-${formatNum(curDate.getDate())}`;
export default {
	name: 'vcp-calendar-date-item',
	props: {
		dateRender: Function,
		date: Object
	},
	render(h) {

		return (
			<span class={this.date.date === curDateStr ? '_selected' : ''}>
               
				{this.dateRender ? this.dateRender(this.date) : this.date.day}
			</span>
		);
	}
};
</script>
<style scoped>
._selected{
	width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #2f75ef;
    color: #fff;
    box-shadow: 1px 2px 10px #2f8aef;
	display: flex;
    align-items: center;
    justify-content: center;
}

</style>
