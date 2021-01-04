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
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch, getCurrentInstance } from 'vue';
import { gsap } from 'gsap';

export default {
    setup(){
        const { ctx } = getCurrentInstance();
        const wordid = ref(0);
        const content = ref("");
        const lickCount = ref(0);
        const tweenedNumber = ref(0);
        const clickLick = ref(false);
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
			})
			.then(function (res) {
                clickLick.value = true;
                lickCount.value = res.data.lickCount;
			})
			.catch((err) => {
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
            animatedNumber
        }
    }
}
</script>