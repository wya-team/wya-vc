import { letterSpacing } from '../constant';

export const registerLetterSpacing = (Quill, whitelist = letterSpacing) => {
	const Parchment = Quill.import("parchment");
	class LetterSpacingAttributor extends Parchment.Attributor.Class {}
	const letterSpacingStyle = new LetterSpacingAttributor("letterSpacing", "ql-letterSpacing", 
		{ scope: Parchment.Scope.INLINE, whitelist });
	Quill.register({ "formats/letterSpacing": letterSpacingStyle }, true);
};