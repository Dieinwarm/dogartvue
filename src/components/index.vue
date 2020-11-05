<template>
	<div>
		<div class="header">🐶 舔狗的艺术</div>
		<el-row type="flex" justify="center">
			<el-col :xs="22" :sm="18" :lg="12">
				<el-header style="height: 60px;margin: 10px 0;" >
					<el-menu mode = "horizontal" text-color = "#2C3E50" active-text-color = "#3498DB" border-bottom = "none" router :default-active = "path">
					<template v-for="(item, index) in nav_menu_data">
						<el-menu-item :index = "item.path" :key = "index">
							{{item.title}}
						</el-menu-item>
					</template>
					</el-menu>
				</el-header>
				<router-view></router-view>
			</el-col>
		</el-row>
		<el-dialog title="API" :visible.sync="apiDialog" custom-class="dialog" top="25vh">
			<p>公共api正在开发中，完善后更新api列表</p>
			<p>目前采用的网络api，它们分别来自：</p>
			<p>https://heweather.net  提供了 舔狗日记的天气、城市 接口</p>
			<br />
			<p>对以上接口服务表示感谢</p>
		</el-dialog>
		<el-dialog title="关于" :visible.sync="aboutDialog" custom-class="dialog" top="15vh">
			<p>关于舔狗的艺术：做这个网站的初衷，是想 <del> 让大家在当舔狗的时候能够有范儿 </del> 让大家看看当舔狗的心酸，请大家多多关注舔狗这个群体，多给他们一点关爱</p>
			<p>后期计划：计划脱离网络api，自己存储数据，实现舔一舔（点赞）和投稿的功能，这个过程可能非常漫长，不是说技术上有多难实现，而是因为懒。</p>
			<p>如何联系你：你可以在Github上提交issues，我会看到的</p>
			<p>你是谁：<del> 大家好，我是傻逼 </del>  Nobody cares.</p>
			<hr />
			<h3>Donate:</h3>
			<p>如果你认为这个网站对你有所帮助或者其他什么烂大街的理由，你可以用你的大手机扫一扫下面的神秘二维码，<del>你的赞赏将会用于服务器的购买和维护</del> 你就可以请我喝一杯咖啡。你可以在赞赏留言中留下姓名或称呼，我将不定期更新 <el-link type="primary">赞赏名单</el-link></p>
			<div style="text-align: center;"><img src="../../public/images/wechat.jpg" width="60%" /></div>
		</el-dialog>
		<el-dialog title="更新记录" :visible.sync="updateDialog" custom-class="dialog" top="25vh">
			<h3>2020.11.01</h3>
			<p>数据本地化，后端采用Thinkphp6</p>
			<p>后端仍在完善，完善后开源</p>
			<h3>2020.6.11</h3>
			<p>舔狗的艺术 上线，数据全部来自网络api</p>
			<p>前端开源到Github</p>
		</el-dialog>
		<div class="footer">
			<div style="line-height:30px;">
				<el-link type="primary" class="footer-link" :underline="false" @click="apiDialog = true">API</el-link>
				<el-link type="primary" class="footer-link" :underline="false" href="https://github.com/Dieinwarm/dogartvue" target="_blank" >Github</el-link>
				<el-link type="primary" class="footer-link" :underline="false" @click="aboutDialog = true">关于</el-link>
				<el-link type="primary" class="footer-link" :underline="false" @click="updateDialog = true">更新日志</el-link>
			</div>
			<div class="footer-text">     .</div>
			<div class="footer-text" style="color: transparent;">I feeling like I'm falling.</div>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				path: '',
				nav_menu_data: [{
					title: '舔狗の语',
					path: '/words'
				}, {
					title: '舔狗日记',
					path: '/diary'
				}],
				apiDialog: false,
				aboutDialog: false,
				updateDialog: false
			}
		},
		methods:{
			onRouteChanged () {
				let that = this;
				that.path  = that.$route.path
			}
		},
		created () {
			this.onRouteChanged()
		},
		watch: {
			// 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
			'$route': 'onRouteChanged'
		}
	}
</script>

<style>
</style>
