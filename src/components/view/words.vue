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
            <el-button type="primary" size="medium" @click="getWords" round>再来一条</el-button>
            <el-button size="medium" @click="lick" round :disabled="clickLick">👅</el-button>
            <el-button type="success" size="medium" @click="sendWordDialog = true" round>投稿</el-button>
        </div>
        <el-dialog title="投稿 舔狗の语" v-model="sendWordDialog" custom-class="send_dialog">
            <p style="color: #808B96;">你可以投稿你当舔狗的经典语录，可以是正常的情话，也可以是土味情话。为了防止可能混入令人不适的内容，
                你的投稿会进行<el-link type="primary" href="https://ai.baidu.com/tech/textcensoring">文本内容审核</el-link>，通过方予展示，
                如果被判断这个句子疑似有 暴恐违禁、政治敏感、恶意推广、低俗辱骂、低质灌水 等倾向，
                则会拒绝这个句子进入内容库。</p>
            <el-form :model="wordsForm" ref="wordsForms" :rules="rules">
                <el-form-item prop="words">
                    <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="wordsForm.words"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="sendWordDialog = false">取消</el-button>
                    <el-button type="primary" @click="sendWord">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { computed, onMounted, ref, reactive, watch, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';
import { gsap } from 'gsap';

export default {
    setup(){
        const ctx = getCurrentInstance()?.appContext.config.globalProperties;
        const axios = ctx.$axios;
        const wordid = ref(0);
        const content = ref("");
        const lickCount = ref(0);
        const tweenedNumber = ref(0);
        const clickLick = ref(false);
        const sendWordDialog = ref(false);
        const wordsForms = ref();
        const wordsForm = reactive({
            words: ""
        });
        const rules = reactive({
            words: [
                { required: true, message: '不说点什么怎么舔呢', trigger: 'blur' },
                { min: 8, max: 140, message: '你的投稿字符长度达不到合格的舔狗标准(8-140字)', trigger: 'blur' }
            ]
        })

        const getWords = () => {
            axios.get("/words").then(res => {
                wordid.value = res.data.id;
                content.value = res.data.content;
                lickCount.value = res.data.lickCount;
                clickLick.value = res.data.lickDisable;
            }).catch((err) => {
                console.log(err);
            });
        };
        const lick = () => {
            axios.post("/wordslick", {
                id: wordid.value
            }).then(res => {
                clickLick.value = true;
                lickCount.value = res.data.lickCount;
            }).catch(err => {
                console.log(err);
            });
        }
        const sendWord = () => {
            wordsForms.value.validate((valid) => {
                if (valid) {
                    axios.post("/addWords",wordsForm).then((res) => {
                        if(res.data.conclusionType == 1){
                            ElMessage.success('恭喜你提交成功，审核后即可显示');
                            wordsForms.value.resetFields();
                            sendWordDialog.value = false;
                        }else{
                            ElMessage.error('你写的东西有点不对头');
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    return false;
                }
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
            wordsForms,
            rules,
            sendWord,
            animatedNumber
        }
    }
}
</script>