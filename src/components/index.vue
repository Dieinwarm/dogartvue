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
		<div class="footer">
			<div style="line-height:30px;">
				<el-button type="text" class="footer-link" @click="apiDialog = true">API</el-button>
				<el-link type="primary" class="footer-link" :underline="false" href="https://github.com/Dieinwarm/dogartvue" target="_blank" >Github<i class="el-icon-link el-icon--right"></i></el-link>
				<el-button type="text" class="footer-link" @click="aboutDialog = true">关于</el-button>
				<el-button type="text" class="footer-link" @click="updateDialog = true">更新日志</el-button>
			</div>
			<div class="footer-text">-</div>
			<div class="footer-text" style="color: transparent;">I feeling like I'm falling.</div>
		</div>
		<el-dialog title="API" v-model="apiDialog" custom-class="tip_dialog">
			<p>公共api正在开发中，完善后更新api列表</p>
			<p>目前采用的网络api，它们分别来自：</p>
			<p>https://heweather.net  提供了 舔狗日记的天气、城市 接口</p>
			<br />
			<p>对以上接口服务表示感谢</p>
		</el-dialog>
		<el-dialog title="关于" v-model="aboutDialog" custom-class="tip_dialog">
			<p>关于舔狗的艺术：做这个网站的初衷，是想 <del> 让大家在当舔狗的时候能够有范儿 </del> 让大家看看当舔狗的心酸，请大家多多关注舔狗这个群体，多给他们一点关爱</p>
			<p>后期计划：计划脱离网络api，自己存储数据，实现舔一舔（点赞）和投稿的功能，这个过程可能非常漫长，不是说技术上有多难实现，而是因为懒。</p>
			<p>如何联系你：你可以在Github上提交issues，我会看到的</p>
			<p>你是谁：<del> 大家好，我是傻逼 </del>  Nobody cares.</p>
			<hr />
			<h3>Donate:</h3>
			<p>如果你认为这个网站对你有所帮助或者其他什么烂大街的理由，你可以用你的大手机扫一扫下面的神秘二维码，<del>你的赞赏将会用于服务器的购买和维护</del> 你就可以请我喝一杯咖啡。你可以在赞赏留言中留下姓名或称呼，我将不定期更新 <el-link type="primary">赞赏名单</el-link></p>
			<div style="text-align: center;"><img src="../assets/img/wechat.jpg" style="width:60%;" /></div>
		</el-dialog>
		<el-dialog title="更新记录" v-model="updateDialog" custom-class="tip_dialog">
			<h3>2021.01.02</h3>
			<p>前端用 Vue3 重构，采用新的组合api</p>
			<p>组件采用基于 Vue3 的 Element-plus</p>
			<p>学会一些新的技巧并改善了代码</p>
			<h3>2020.11.01</h3>
			<p>数据本地化，后端采用Thinkphp6</p>
			<p>后端仍在完善，完善后开源</p>
			<h3>2020.6.11</h3>
			<p>舔狗的艺术 上线，数据全部来自网络api</p>
			<p>前端开源到Github</p>
		</el-dialog>
	</div>
</template>

<script>
	import { onMounted, ref, reactive } from 'vue';
	import { useRouter } from "vue-router";
	export default{
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
			const apiDialog = ref(false);
			const aboutDialog = ref(false);
			const updateDialog = ref(false);
			onMounted(() => {
				const router = useRouter();
				path.value = router.currentRoute.value.path;
			})
			return {
				path,
				nav_menu_data,
				apiDialog,
				aboutDialog,
				updateDialog
			}
		}
	}
</script>