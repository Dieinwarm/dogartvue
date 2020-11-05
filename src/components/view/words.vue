<template>
  <div>
    <div class="content-box">
      <el-card class="box-card">
        <div class="content" v-cloak>
          <div class="text">{{ content }}</div>
          <div class="lickCount">👅x <countTo :startVal='0' :endVal='lickCount' :duration='500'></countTo></div>
        </div>
      </el-card>
    </div>
    <div class="buttons">
      <el-button type="primary" @click="getWords" round>再来一条</el-button>
      <el-button @click="lick" round :disabled="clickLick">👅</el-button>
      <el-button type="success" @click="tips" round>投稿</el-button>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
export default {
	components: { countTo },
	data() {
		return {
			wid: 0,
			content: "",
			lickCount: 0,
			clickLick: false
		};
	},
	created: function () {
		this.getWords();
	},
	methods: {
		lick: function () {
			let that = this;
			this.$axios
			.post("http://127.0.0.1/wordslick", {
				id: that.wid,
			})
			.then(function (res) {
				that.lickCount = that.lickCount+1;
				that.clickLick = true;
			})
			.catch((err) => {
				console.log(err);
			});
		},
		getWords: function () {
			let that = this;
			this.$axios
			.post("http://127.0.0.1/words")
			.then(function (res) {
				that.clickLick = false;
				that.wid = res.data.id;
				that.content = res.data.content;
				that.lickCount = res.data.lickCount;
			})
			.catch((err) => {
				console.log(err);
			});
		},
		tips() {
			this.$message({
			message: "coming soon~~",
			type: "success",
			});
		}
	}
};
</script>

<style>
</style>
