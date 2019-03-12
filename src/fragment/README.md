## [Demo Basic](https://wya-team.github.io/wya-vc/dist/fragment.html)
## 功能
实现 以下功能
```html
<>
	<div></div>
	<div></div>
	<div></div>
</>
```

## 基础用法

```vue
<template>
	<div>
		<vc-fragment>
			<div>1</div>
			<div>2</div>
			<div>3</div>
			<div>4</div>
			<div>5</div>
		</vc-fragment>
	</div>
</template>
<script>
import { Fragment } from '@wya/vc';

export default {
	name: 'vc-fragment-basic',
	components: {
		'vc-fragment': Fragment
	},
};
</script>


```