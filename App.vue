<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 全局样式 */
page {
	background-color: #F5F5DC;
}

	/* 替代uni-app默认阴影图片的CSS阴影 */
	.uni-shadow {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	/* 通用阴影样式 */
	.shadow-sm {
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.shadow-md {
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.shadow-lg {
		box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
	}

	/* 修复可能的样式冲突 */
	* {
		box-sizing: border-box;
	}

	/* 确保图片加载失败时的处理 */
	image {
		background-color: #f5f5f5;
	}

	/* 优化滚动体验 */
	::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}

	::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 3px;
	}

	::-webkit-scrollbar-thumb {
		background: #c1c1c1;
		border-radius: 3px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #a8a8a8;
	}
</style>
