<template>
	<div id="toolbar">
		<span class="ql-formats">
			<button class="ql-bold" />
			<button class="ql-italic" />
			<button class="ql-underline" />
			<button class="ql-strike" />
		</span>
		<span class="ql-formats">
			<button class="ql-blockquote" />
			<button class="ql-code-block" />
		</span>
		<span class="ql-formats">
			<button class="ql-header" value="1" />
			<button class="ql-header" value="2" />
		</span>
		<span class="ql-formats">
			<button class="ql-list ql-active" value="ordered" />
			<button class="ql-list" value="bullet" />
		</span>
		<span class="ql-formats">
			<button class="ql-script" value="sub" />
			<button class="ql-script" value="super" />
		</span>
		<span class="ql-formats">
			<button class="ql-indent" value="-1" />
			<button class="ql-indent" value="+1" />
		</span>
		<span class="ql-formats">
			<button class="ql-direction" value="rtl" />
		</span>
		<span class="ql-formats">
			<select class="ql-size">
				<option selected value="12px" />
				<option value="14px" />
				<option value="16px" />
				<option value="18px" />
				<option value="20px" />
				<option value="22px" />
				<option value="24px" />
				<option value="50px" />
			</select>
		</span>
		<span class="ql-formats">
			<select class="ql-header">
				<option value="1" />
				<option value="2" />
				<option value="3" />
				<option value="4" />
				<option value="5" />
				<option value="6" />
				<option selected />
			</select>
		</span>
		<span class="ql-formats">
			<!-- eslint-disable max-len -->
			<select class="ql-color"><option selected="selected" /><option value="#e60000" /><option value="#ff9900" /><option value="#ffff00" /><option value="#008a00" /><option value="#0066cc" /><option value="#9933ff" /><option value="#ffffff" /><option value="#facccc" /><option value="#ffebcc" /><option value="#ffffcc" /><option value="#cce8cc" /><option value="#cce0f5" /><option value="#ebd6ff" /><option value="#bbbbbb" /><option value="#f06666" /><option value="#ffc266" /><option value="#ffff66" /><option value="#66b966" /><option value="#66a3e0" /><option value="#c285ff" /><option value="#888888" /><option value="#a10000" /><option value="#b26b00" /><option value="#b2b200" /><option value="#006100" /><option value="#0047b2" /><option value="#6b24b2" /><option value="#444444" /><option value="#5c0000" /><option value="#663d00" /><option value="#666600" /><option value="#003700" /><option value="#002966" /><option value="#3d1466" /></select>
			<select class="ql-background"><option value="#000000" /><option value="#e60000" /><option value="#ff9900" /><option value="#ffff00" /><option value="#008a00" /><option value="#0066cc" /><option value="#9933ff" /><option selected="selected" /><option value="#facccc" /><option value="#ffebcc" /><option value="#ffffcc" /><option value="#cce8cc" /><option value="#cce0f5" /><option value="#ebd6ff" /><option value="#bbbbbb" /><option value="#f06666" /><option value="#ffc266" /><option value="#ffff66" /><option value="#66b966" /><option value="#66a3e0" /><option value="#c285ff" /><option value="#888888" /><option value="#a10000" /><option value="#b26b00" /><option value="#b2b200" /><option value="#006100" /><option value="#0047b2" /><option value="#6b24b2" /><option value="#444444" /><option value="#5c0000" /><option value="#663d00" /><option value="#666600" /><option value="#003700" /><option value="#002966" /><option value="#3d1466" /></select>
		</span>
		<span class="ql-formats">
			<select class="ql-font">
				<option selected="selected" />
				<option value="serif" />
				<option value="monospace" />
			</select>
		</span>
		<span class="ql-formats">
			<select class="ql-align">
				<option selected="selected" />
				<option value="center" />
				<option value="right" />
				<option value="justify" />
			</select>
		</span>
		<span class="ql-formats">
			<button class="ql-link" />
			<!-- 工具栏按钮扩展 -->
			<slot />
		</span>
	</div>
</template>