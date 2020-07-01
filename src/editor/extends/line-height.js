export const registerLineHeight = (Quill) => {
	const Parchment = Quill.import("parchment");
	class LineHeightAttributor extends Parchment.Attributor.Class {}
	const pixelLevels = ['10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30'];
	const lineHeightStyle = new LineHeightAttributor("lineHeight", "ql-lineHeight", 
		{ scope: Parchment.Scope.INLINE, whitelist: pixelLevels });
	Quill.register({ "formats/lineHeight": lineHeightStyle }, true);
};