<template>
	<div>
		<div class="diary-content-box">
			<el-card class="box-card">
				<div class="diary-content" v-cloak>
					<div class="diary-text">
						<p>{{weatherstr}} <br> {{city}}</p>
						<p>{{content}}</p>
					</div>
				</div>
			</el-card>
		</div>
		<div class="buttons">
			<el-button type="primary" @click="getDiary" round>再来一份</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				content: "",
				weatherstr: "",
				city: ""
			}
		},
		created: function() {
			this.getDiary();
			this.getweather();
		},
		methods: {
			getDiary: function() {
				let that = this;
				this.$axios.get("https://v1.alapi.cn/api/dog").then(function(res) {
					that.content = res.data.data.content;
				}).catch(err => {
					console.log(err);
				});
			},
			getweather: function() {
				var date = new Date();
				var year = date.getFullYear().toString();
				var month = (date.getMonth() + 1).toString();
				var day = date.getDate().toString();
				var city = localStorage.getItem('city') || '';
				var cloud = localStorage.getItem('cloud') || '';
				var cond = localStorage.getItem('cond') || '';
				var dateStart = new Date(localStorage.getItem('date') || new Date());
				var dayDiff = date.getDate() - dateStart.getDate();
				var weatherKeys = [
					'fbb7fed63979495f88fc1ddc7296f497', 
					'f3488e987bce466d8ae6b523becf278f',
					'95cf38cd40b84df9beae340c610e8550', 
					'3cad9669ecba42c39ebfd73cdb566329', 
					'6ec2f3eef9bc448ba8a72e815dd86f12'
				];
				if (city == '' || dayDiff >= 1) {
					var weather = {};
					for (var i = 0; i < weatherKeys.length; i++) {
						this.$axios.get('https://free-api.heweather.net/s6/weather/now?location=auto_ip&key=' + weatherKeys[i]).then(
							function(res) {
								weather = res.data.HeWeather6[0];
								city = weather.basic.parent_city || '';
								cloud = weather.now.fl || ''
								cond = weather.now.cond_txt || ''
								localStorage.setItem('city', city);
								localStorage.setItem('cloud', cloud);
								localStorage.setItem('cond', cond);
								localStorage.setItem('date', new Date());
							}).catch(err => {
							console.log(err);
						});
						if (weather.status == 'ok') {
							break
						};
					}
				}
				this.weatherstr = year + '年' + month + '月' + day + '日 ' + city;
				this.city =  cond + ' / ' + cloud + '℃';
			}
		}
	}
</script>

<style>
</style>
