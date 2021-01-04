<template>
	<div>
		<div class="content-box">
			<el-card class="box-card">
				<div class="content" v-cloak>
					<div class="text">{{ content }}</div>
					<div class="lickCount">👅x {{ animatedNumber }}</div>
				</div>
			</el-card>
		</div>
		<div class="buttons">
			<el-button type="primary" @click="getWords" round>再来一条</el-button>
			<el-button @click="lick" round :disabled="clickLick">👅</el-button>
			<el-button type="success" @click="sendWordDialog = true" round>投稿</el-button>
		</div>
		<el-dialog title="投稿 舔狗の语" v-model="sendWordDialog" custom-class="send_dialog">
			<p>你可以投稿你认为适当的内容，可以是正常的情话，当然也可以是土味情话。为了防止可能混入令人不适的内容，
				后台会对每次提交的内容进行审核，通过方予展示，如果被判断这个句子疑似有 暴恐违禁、政治敏感、恶意推广、低俗辱骂、低质灌水 等倾向，
				则会自动拒绝这个句子进入内容库。当然这可能造成误伤，但是为了保持内容库的清洁，还请见谅。</p>
			<el-form :model="wordsForm">
				<el-form-item prop="words">
					<el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="wordsForm.words"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="sendWordDialog = false">取 消</el-button>
					<el-button type="primary" @click="sendWord">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script>
import { computed, onMounted, ref, reactive, watch, getCurrentInstance } from 'vue';
import { gsap } from 'gsap';

export default {
	setup(){
		const ctx = getCurrentInstance();
		const wordid = ref(0);
		const content = ref("");
		const lickCount = ref(0);
		const tweenedNumber = ref(0);
		const clickLick = ref(false);
		const sendWordDialog = ref(false);
		const wordsForm = reactive({
			words: ""
		})

		const getWords = () => {
			ctx.$axios.get("/words").then(res => {
				wordid.value = res.data.id;
				content.value = res.data.content;
				lickCount.value = res.data.lickCount;
				clickLick.value = false;
			}).catch((err) => {
				console.log(err);
			});
		};
		const lick = () => {
			ctx.$axios.post("/wordslick", {
				id: wordid.value,
			}).then(res => {
				clickLick.value = true;
				lickCount.value = res.data.lickCount;
			}).catch(err => {
				console.log(err);
			});
		}
		const sendWord = () => {
			ctx.$axios.post("/addWords",wordsForm).then(() => {
				ctx.$message({
					message: '恭喜你，提交成功，审核后即可显示',
					type: 'success'
				});
				sendWordDialog.value = false;
				wordsForm.words = "";
			}).catch((err) => {
				console.log(err);
			});
		}

		onMounted(() => {
			getWords();
		})
		const animatedNumber = computed(() => {
			return tweenedNumber.value.toFixed(0);
		});
		watch(lickCount,(nv) => {
			tweenedNumber.value = 0;
			gsap.to(tweenedNumber, { duration: 0.5, value: nv });
		});
		return {
			lickCount,
			clickLick,
			content,
			getWords,
			lick,
			sendWordDialog,
			wordsForm,
			sendWord,
			animatedNumber
		}
	}
}
</script>