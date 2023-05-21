<template>
    <div>
        <el-carousel v-if="looplist.length" height="calc(100vh - 60px)" direction="vertical" :autoplay="false">
            <el-carousel-item v-for="item in looplist" :key="item._id">
                <div :style="{ backgroundImage: `url(http://localhost:3000${item.coverImg})` }" class="itemImg">

                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <h3>{{ item.productName }}</h3>
                            </div>
                        </template>
                        <div>{{ item.introduce }}</div>
                        <div>{{ item.detail }}</div>

                        <div class="more">
                            更多信息，请访问: <br>
                            https://www.bilibili.com/
                        </div>

                    </el-card>

                </div>
            </el-carousel-item>
        </el-carousel>
        <el-empty v-else description="description" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from 'axios'
const looplist = ref([])
onMounted(async () => {
    await axios.get("/webapi/product/productlist").then(res =>
        // console.log(res.data)
        looplist.value = res.data.iWantData

    )
})
</script>


<style scoped lang="scss">
.itemImg {
    width: 100%;
    height: 100%;
    background-image: cover;
}

.box-card {
    width: 50%;
    height: 100%;
    background-color: rgba($color: white, $alpha: 0.7);

    div {
        margin-top: 20px;
    }
}

:deep(.el-carousel__indicator) {
    // background-color: orange;
    margin-right: 30px;
    margin-bottom: 10px;

    .el-carousel__button {
        width: 5px;
        height: 30px;
    }
}

// :deep(.el-carousel__button) {
//     width: 5px;
//     height: 30px;
// }
</style>