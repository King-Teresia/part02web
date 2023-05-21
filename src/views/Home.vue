<template>
    <div class="container">
        <el-carousel height="calc(100vh - 60px)">
            <el-carousel-item :key="1">
                <div :style="{ backgroundImage: `url(${require('../assets/homePic01.png')})` }">

                </div>
            </el-carousel-item>
            <el-carousel-item :key="2">
                <div :style="{ backgroundImage: `url(${require('../assets/homePic02.jpg')})` }">

                </div>
            </el-carousel-item>
            <el-carousel-item :key="3">
                <div :style="{ backgroundImage: `url(${require('../assets/homePic03.png')})` }">

                </div>
            </el-carousel-item>
        </el-carousel>

        <div class="center">
            晚安克莉斯
        </div>
    </div>
</template>



<style lang="scss" scoped>
.el-carousel div {
    width: 100%;
    height: 100%;
}

.container {
    position: relative;

    .center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 50px;
        line-height: 50px;
        font-size: 30px;
        color: white;
        text-align: center;

    }
}
</style>