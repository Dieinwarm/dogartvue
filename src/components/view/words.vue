<template>
	<div>
		<div class="content-box">
			<el-card class="box-card">
				<div class="content" v-cloak>
					<div class="text">{{ content }}</div>
					<div class="lickCount">👅x{{ lickCount }}</div>
				</div>
			</el-card>
		</div>
		<div class="buttons">
			<el-button type="primary" @click="getWords" round>再来一条</el-button>
			<el-button @click="lick" round :disabled="clickLick">👅</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
		    return {
		        content: "",
		        lickCount: 0,
		        clickLick: false
		    }
		},
		created:function(){
			this.getWords();
		},
		methods:{
		    lick: function () {
		        this.lickCount += 1;
		        this.clickLick = true
		    },
			getWords: function(){
				let that = this;
				this.$axios.get("https://api.uixsj.cn/hitokoto/get?type=fart&code=json").then(function(res){
					that.clickLick =false;
					that.content = res.data.content;
					//that.lickCount = res.data.lickCount;
				}).catch(err=>{
					console.log(err);
				});
			}
		}
	}
</script>

<style>
</style>
