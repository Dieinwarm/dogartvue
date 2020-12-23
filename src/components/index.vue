<template>
	<div>
		<div class="header">🐶 舔狗的艺术</div>
		
	</div>
</template>

<script>
	export default{
		data() {
			return {
                path: [],
                nav_menu_data: [{
					title: '舔狗の语',
					path: '/words'
				}, {
					title: '舔狗日记',
					path: '/diary'
				}],
			}
		},
		methods:{
			onRouteChanged () {
				this.path  = [this.$route.path];
			}
		},
		created () {
			this.onRouteChanged()
		},
		watch: {
			'$route': 'onRouteChanged'
		}
	}
</script>