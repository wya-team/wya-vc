export const registerLetterSpacing = (Quill) => {
	const Parchment = Quill.import("parchment");
	class LetterSpacingAttributor extends Parchment.Attributor.Class {}
	const pixelLevels = ['0px', '1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px', '9px', '10px'];
	const letterSpacingStyle = new LetterSpacingAttributor("letterSpacing", "ql-letterSpacing", 
		{ scope: Parchment.Scope.INLINE, whitelist: pixelLevels });
	Quill.register({ "formats/letterSpacing": letterSpacingStyle }, true);
};