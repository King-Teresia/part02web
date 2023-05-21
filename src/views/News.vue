<template>
    <div class="container">
        <div class="news-header" :style="{
            backgroundImage: `url(${require('../assets/bg.png')})`
        }">
        </div>

        <div class="search">
            <el-popover placement="bottom" title="检索结果" width="50%" :visible="visible">
                <template #reference>
                    <el-input v-model="searchTxt" class="w-50 m-2" size="large" placeholder="Please Input"
                        :prefix-icon="Search" type="search" @input="visible = true" @blur="visible = false" />
                </template>

                <!-- <div>123456</div> -->
                <div v-if="searchNewsList.length">
                    <div class="searchItem" v-for="item in searchNewsList" :key="item._id" @click="changePage(item._id)">
                        {{ item.title }}
                    </div>
                </div>
                <div v-else>
                    <el-empty description="暂无新闻" :image-size="30" />
                </div>

            </el-popover>
        </div>

        <div class="topnews">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in topNews" :key="item._id">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }" @click="changePage(item._id)">
                        <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.coverImg})` }">
                        </div>
                        <div style="padding: 14px">
                            <span>{{ item.title }}</span>
                            <div class="bottom">
                                <time class="time">{{ timeSet(item.editTime) }}</time>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <el-tabs style="margin:20px" v-model="activeName" class="demo-tabs">
            <el-tab-pane v-for="item in tablist" :key="item.name" :label="item.label" :name="item.name">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div v-for="data in tabnews[item.name]" :key="data._id" style="margin: 10px;">
                            <el-card shadow="hover" :body-style="{ padding: '0px' }" @click="changePage(data._id)">
                                <div class="tab-image"
                                    :style="{ backgroundImage: `url(http://localhost:3000${data.coverImg})` }">
                                </div>
                                <div style="padding: 14px ; float:left">
                                    <span>{{ data.title }}</span>
                                    <div class="bottom">
                                        <time class="tab-time">{{ timeSet(data.editTime) }}</time>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>

                    <el-col :span="6">
                        <el-timeline>
                            <el-timeline-item v-for="data in tabnews[item.name]" :key="data._id"
                                :timestamp="timeSet(data.editTime)">
                                {{ data.title }}
                            </el-timeline-item>
                        </el-timeline>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>


        <el-backtop />

    </div>
</template>


<script setup scoped>
import { ref, onMounted, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import axios from "axios"
import moment from "moment"
import lodash from "lodash"
import { useRouter } from "vue-router";
const router = useRouter()
moment.locale("zh-cn")

const timeSet = (time) => {
    return moment(time).format("lll")
}
const newslist = ref([])
const searchTxt = ref("")
const visible = ref(false)
const activeName = ref(1)
const tablist = [
    {
        label: "最新动态",
        name: 1//因为咱们的category也是1为最新动态  ....之类的 后续我们用得到
    },
    {
        label: "典型案例",
        name: 2
    },
    {
        label: "通知公告",
        name: 3
    }
]

const changePage = (id) => {
    // console.log(id);
    router.push(`/news/${id}`)
}
onMounted(async () => {
    await axios.get("/webapi/news/newslist").then(res => {
        newslist.value = res.data.iWantData
    })
    // console.log(newslist.value);
    // console.log(lodash.groupBy(newslist.value, item => item.category));//看看lodash的威力 

})
// 开始分组 category 1 动态 2典型 3通告
const tabnews = computed(() => lodash.groupBy(newslist.value, item => item.category))
// console.log(tabnews);




let searchNewsList = computed(() => searchTxt.value ? newslist.value.filter(item => item.title.includes(searchTxt.value)) : [])

// 好了，接下来就开始做 四个 展示
const topNews = computed(() => newslist.value.slice(0, 4))






</script>

<style lang="scss" scoped>
.container {
    position: relative;

    .news-header {
        width: 100%; //宽度默认就是100%
        height: 400px;
        background-size: cover;
    }
}

.search {
    position: absolute;
    top: 300px;
    width: 100%;
    text-align: center;

    .el-input {
        width: 50%;
    }
}

.searchItem {
    height: 50px;
    line-height: 50px;

    &:hover {
        background-color: whitesmoke;
        color: rgb(81, 151, 200);
    }
}

.topnews {
    margin: 20px;

    .image {
        width: 100%;
        height: 150px;
        background-size: cover;
    }

    .time {
        font-size: 13px;
        color: gray;
    }
}

.tab-image {
    width: 150px;
    height: 100px;
    background-size: cover;
    float: left;
}

.tab-time {
    font-size: 13px;
    color: gray;
}
</style>