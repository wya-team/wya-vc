import { lineHeight } from '../constant';

export const registerLineHeight = (Quill, whitelist) => {
	const Parchment = Quill.import("parchment");
	class LineHeightAttributor extends Parchment.Attributor.Class {}
	const lineHeightStyle = new LineHeightAttributor("lineHeight", "ql-lineHeight", 
		{ scope: Parchment.Scope.INLINE, whitelist: whitelist || lineHeight });
	Quill.register({ "formats/lineHeight": lineHeightStyle }, true);
};