export const defaultRenderDate = (h, { date, formatterDate }) => {
	return <span class={date.date === formatterDate ? "is-selected" : ""}>{date.day}</span>;
};
export const defaultRenderMonth = (h, { month, year, lang, monthNames }) => {
	return (
		<div class="vc-calendar__month">
			<div>
				{monthNames[month][lang]} &nbsp;&nbsp;&nbsp;&nbsp;
				{year}
			</div>
		</div>
	);
};
export const defaultRenderWeek = (h, { weekNames, lang }) => {
	return (
		<div class="vc-calendar__week">
			{
				weekNames.map((item, index) => {
					return <span key={index}>{item[lang]}</span>;
				})
			}
		</div>
	);
};