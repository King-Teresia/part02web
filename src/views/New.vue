<!-- 新闻详情页 -->
<template>
    <el-row>
        <el-col :span="17" :offset="1">
            <div>
                <h3>{{ currentNews.title }}</h3>
                <div class="timer">
                    {{ timeSet(currentNews.editTime) }}
                </div>
                <el-divider />
                <div v-html="currentNews.content">
                </div>

            </div>
        </el-col>
        <el-col :span="4" :offset="1" :pull="1">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span style="font-size:16px;font-weight: bold;">最近新闻</span>
                    </div>
                </template>
                <div v-for="item in topNews" :key="item._id" class="text item" style="padding: 10px;"
                    @click="changePage(item._id)">
                    <span>{{ item.title }}</span>
                    <div class="bottom">
                        <time class="timer">{{ timeSet(item.editTime) }}</time>
                        <el-divider />
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup >

import { onMounted, ref, watchEffect, onBeforeUnmount } from 'vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router'
import moment from "moment"
moment.locale("zh-cn")
const timeSet = (time) => {
    return moment(time).format("lll")
}
const currentNews = ref({})
const route = useRoute()
const router = useRouter()
const topNews = ref([])
const cancelMounted = watchEffect(async () => {
    if (!route.params.id) return
    await axios.get(`/webapi/news/newslist/${route.params.id}`).then(res => {
        // console.log(res.data.iWantData[0]);
        currentNews.value = res.data.iWantData[0]
    })

    // 开始做最新新闻
    await axios.get(`/webapi/news/toplist?limit=4`).then(res => {
        console.log(res.data.iWantData);
        topNews.value = res.data.iWantData
    })
})

// onBeforeUnmount(() => {
//     cancelMounted()  kerwin为啥要用这个onBeforeUnmount呢
// })

const changePage = id => router.push(`/news/${id}`);

</script>


<style lang="scss" scoped>
.el-col {
    margin-top: 20px;
}

.timer {
    font-size: 13px;
    color: gray;
}
</style>

