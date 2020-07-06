<template>
    <el-card>
        <h1>Your score is {{score}}/{{noq}}</h1>
    </el-card>
</template>
<script>
export default {
    props:['prevscore','nos'],
    data(){
        return{
            score:0,
            noq:0
        }
    },
    created(){
        this.score=this.prevscore
        this.noq=this.nos
    }

}
</script>