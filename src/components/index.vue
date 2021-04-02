<template>
	<div>
		<div class="header">🐶 舔狗的艺术</div>
		<el-row type="flex" justify="center">
			<el-col :xs="22" :sm="18" :lg="12">
				<el-header height="61px">
					<el-menu mode = "horizontal" text-color = "#2C3E50" active-text-color = "#3498DB" border-bottom = "none" router :default-active = "path">
						<el-menu-item  v-for="(item, index) in nav_menu_data" :index = "item.path" :key = "index">
							{{item.title}}
						</el-menu-item>
					</el-menu>
				</el-header>
				<router-view></router-view>
			</el-col>
		</el-row>
		<coustom-footer></coustom-footer>
	</div>
</template>

<script>
	import { onMounted, ref, reactive } from 'vue';
	import { useRouter } from "vue-router";
	import coustomFooter from "./common/footer";
	export default{
		components: { coustomFooter },
		setup(){
			const path = ref("");
			const nav_menu_data = reactive(
				[{
					title: '舔狗の语',
					path: '/words'
				}, {
					title: '舔狗日记',
					path: '/diary'
				}]
			);
			onMounted(() => {
				const router = useRouter();
				path.value = router.currentRoute.value.path;
			})
			return {
				path,
				nav_menu_data
			}
		}
	}
</script>