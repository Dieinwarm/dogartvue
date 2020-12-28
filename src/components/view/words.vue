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
import { computed, ref, watch } from 'vue';
import { gsap } from 'gsap';

export default {
    setup(){
        const lickCount = ref(0);
        const tweenedNumber = ref(0);
        const clickLick = ref(false);
        const content = ref("asdasda打算大大大大人");
        const getWords = () => {

        };
        const lick = () => {
            clickLick.value = true;
            lickCount.value += 20 ;
        }
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