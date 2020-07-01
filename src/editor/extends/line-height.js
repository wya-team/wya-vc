import { lineHeight } from '../constant';

export const registerLineHeight = (Quill, whitelist = lineHeight) => {
	const Parchment = Quill.import("parchment");
	class LineHeightAttributor extends Parchment.Attributor.Class {}
	const lineHeightStyle = new LineHeightAttributor("lineHeight", "ql-lineHeight", 
		{ scope: Parchment.Scope.INLINE, whitelist });
	Quill.register({ "formats/lineHeight": lineHeightStyle }, true);
};