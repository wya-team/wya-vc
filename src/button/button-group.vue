<template>
	<div :class="classes" class="vc-btn-group">
		<slot/>
	</div>
</template>
<script>
export default {
	name: "vc-button-group",
	props: {
		vertical: {
			type: Boolean,
			default: false
		},
		circle: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: 'medium'
		}
	},
	provide() {
		return { group: this };
	},
	data() {
		return {
		};
	},
	computed: {
		classes() {
			return [
				{
					'is-vertical': this.vertical,
					'is-circle': this.circle,
					[`is-${this.size}`]: !!this.size
				}
			];
		},
	},
	methods: {
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

@include block(vc-btn-group) {
	display: inline-block;
	@include block(vc-btn) {
		position: relative;
		display: block;
		float: left;
		margin-left: -1px;
		border-radius: 0;
		&:first-child {
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
		}
		&:last-child {
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;
		}
		&:hover {
			z-index: 2;
		}
	}
	@include when(large) {
		@include block(vc-btn) {
			padding: 8px 16px;
			font-size: 14px;
			&:first-child {
				border-top-left-radius: 4px;
				border-top-right-radius: 0;
				border-bottom-left-radius: 4px;
				border-bottom-right-radius: 0;
			}
			&:last-child {
				border-top-left-radius: 0;
				border-top-right-radius: 4px;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 4px;
			}
		}
	}
	@include when(small) {
		@include block(vc-btn) {
			padding: 3px 8px;
			font-size: 12px;
			&:first-child {
				border-top-left-radius: 3px;
				border-top-right-radius: 0;
				border-bottom-left-radius: 3px;
				border-bottom-right-radius: 0;
			}
			&:last-child {
				border-top-left-radius: 0;
				border-top-right-radius: 3px;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 3px;
			}
		}
	}
	@include when(vertical) {
		@include block(vc-btn) {
			float: none;
			margin-left: 0;
			margin-top: -1px;
			&:first-child {
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}
			&:last-child {
				border-top-left-radius: 0;
				border-top-right-radius: 0; 
				border-bottom-left-radius: 4px;
				border-bottom-right-radius: 4px;
			}
		}
		@include when(circle) {
			@include block(vc-btn) {
				&:first-child {
					border-top-left-radius: 36px;
					border-top-right-radius: 36px; 
					border-bottom-left-radius: 0;
					border-bottom-right-radius: 0; 
				}
				&:last-child {
					border-top-left-radius: 0;
					border-top-right-radius: 0; 
					border-bottom-left-radius: 36px;
					border-bottom-right-radius: 36px; 
				}
			}
			@include when(large) {
				@include block(vc-btn) {
					&:first-child {
						border-top-left-radius: 36px;
						border-top-right-radius: 36px; 
						border-bottom-left-radius: 0;
						border-bottom-right-radius: 0; 
					}
					&:last-child {
						border-top-left-radius: 0;
						border-top-right-radius: 0; 
						border-bottom-left-radius: 36px;
						border-bottom-right-radius: 36px; 
					}
				}
			}
			@include when(small) {
				@include block(vc-btn) {
					&:first-child {
						border-top-left-radius: 24px;
						border-top-right-radius: 24px; 
						border-bottom-left-radius: 0;
						border-bottom-right-radius: 0; 
					}
					&:last-child {
						border-top-left-radius: 0;
						border-top-right-radius: 0; 
						border-bottom-left-radius: 24px;
						border-bottom-right-radius: 24px; 
					}
				}
			}
		}
	}
	@include when(circle) {
		@include block(vc-btn) {
			&:first-child {
				border-top-left-radius: 32px;
				border-top-right-radius: 0; 
				border-bottom-left-radius: 32px;
				border-bottom-right-radius: 0; 
			}
			&:last-child {
				border-top-left-radius: 0px;
				border-top-right-radius: 32px;
				border-bottom-left-radius: 0px;
				border-bottom-right-radius: 32px;
			}
		}
		@include when(large) {
			@include block(vc-btn) {
				&:first-child {
					border-top-left-radius: 36px;
					border-top-right-radius: 0; 
					border-bottom-left-radius: 36px;
					border-bottom-right-radius: 0; 
				}
				&:last-child {
					border-top-left-radius: 0px;
					border-top-right-radius: 36px;
					border-bottom-left-radius: 0px;
					border-bottom-right-radius: 36px;
				}
			}
		}
		@include when(small) {
			@include block(vc-btn) {
				&:first-child {
					border-top-left-radius: 24px;
					border-top-right-radius: 0; 
					border-bottom-left-radius: 24px;
					border-bottom-right-radius: 0; 
				}
				&:last-child {
					border-top-left-radius: 0px;
					border-top-right-radius: 24px;
					border-bottom-left-radius: 0px;
					border-bottom-right-radius: 24px;
				}
			}
		}
	}
}
.vc-btn-group {
	&.vc-btn-group-vertical {
		&.vc-btn-group-circle {
			&.vc-btn-group-large {
				.vc-btn {
					&:first-child {
						border-top-left-radius: 36px;
						border-top-right-radius: 36px; 
						border-bottom-left-radius: 0;
						border-bottom-right-radius: 0; 
					}
					&:last-child {
						border-top-left-radius: 0;
						border-top-right-radius: 0; 
						border-bottom-left-radius: 36px;
						border-bottom-right-radius: 36px; 
					}
				}
			}
			.vc-btn {
				&:first-child {
					border-top-left-radius: 32px;
					border-top-right-radius: 32px; 
					border-bottom-left-radius: 0;
					border-bottom-right-radius: 0; 
				}
				&:last-child {
					border-top-left-radius: 0;
					border-top-right-radius: 0; 
					border-bottom-left-radius: 32px;
					border-bottom-right-radius: 32px; 
				}
			}
			&.vc-btn-group-small {
				.vc-btn {
					&:first-child {
						border-top-left-radius: 24px;
						border-top-right-radius: 24px; 
						border-bottom-left-radius: 0;
						border-bottom-right-radius: 0; 
					}
					&:last-child {
						border-top-left-radius: 0;
						border-top-right-radius: 0; 
						border-bottom-left-radius: 24px;
						border-bottom-right-radius: 24px; 
					}
				}
			}
		}
	}
}
.vc-btn-group-large {
	.vc-btn {
		padding: 8px 16px;
		font-size: 14px;
		&:first-child {
			border-top-left-radius: 4px;
			border-top-right-radius: 0;
			border-bottom-left-radius: 4px;
			border-bottom-right-radius: 0;
		}
		&:last-child {
			border-top-left-radius: 0;
			border-top-right-radius: 4px;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 4px;
		}
	}
}
.vc-btn-group-small {
	.vc-btn {
		padding: 3px 8px;
		font-size: 12px;
		&:first-child {
			border-top-left-radius: 3px;
			border-top-right-radius: 0;
			border-bottom-left-radius: 3px;
			border-bottom-right-radius: 0;
		}
		&:last-child {
			border-top-left-radius: 0;
			border-top-right-radius: 3px;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 3px;
		}
	}
}
.vc-btn-group-circle {
	&.vc-btn-group-large {
		.vc-btn {
			&:first-child {
				border-top-left-radius: 36px;
				border-top-right-radius: 0; 
				border-bottom-left-radius: 36px;
				border-bottom-right-radius: 0; 
			}
			&:last-child {
				border-top-left-radius: 0px;
				border-top-right-radius: 36px;
				border-bottom-left-radius: 0px;
				border-bottom-right-radius: 36px;
			}
		}
	}
	.vc-btn {
		&:first-child {
			border-top-left-radius: 32px;
			border-top-right-radius: 0; 
			border-bottom-left-radius: 32px;
			border-bottom-right-radius: 0; 
		}
		&:last-child {
			border-top-left-radius: 0px;
			border-top-right-radius: 32px;
			border-bottom-left-radius: 0px;
			border-bottom-right-radius: 32px;
		}
	}
	&.vc-btn-group-small {
		.vc-btn {
			&:first-child {
				border-top-left-radius: 24px;
				border-top-right-radius: 0; 
				border-bottom-left-radius: 24px;
				border-bottom-right-radius: 0; 
			}
			&:last-child {
				border-top-left-radius: 0px;
				border-top-right-radius: 24px;
				border-bottom-left-radius: 0px;
				border-bottom-right-radius: 24px;
			}
		}
	}
}
</style>