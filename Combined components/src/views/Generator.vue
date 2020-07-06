<template>
<el-card>
<table>
    <tr>
        <td>Select the type of question:</td>
        <td style="background:black;padding:10px;">
        <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
        {{title}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="mcqc">MCQ</el-dropdown-item>
            <el-dropdown-item command="maq">MAQ</el-dropdown-item>
            <el-dropdown-item command="tf">TRUE OR FALSE</el-dropdown-item>
            <el-dropdown-item command="mtfc">MATCH THE FOLLOWING</el-dropdown-item>
            <el-dropdown-item command="sen">ARRANGE IN ORDER</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
        </td>
    </tr>
</table>
<br>
<component v-bind:is="componentName"></component>
</el-card>
</template>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color:whitesmoke;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

<script>
  import mtfc from "../components/mtfcreator.vue"
  import mcqc from "../components/mcqcreator.vue"
  import sen from "../components/arrangeinorder_creator.vue"
  import maq from "../components/maqcreator.vue"
  import tf from "../components/tfcreator.vue"
  export default {
     data() {
        return {
        componentName: 'mcqc',
        title:'MCQ'
        }
    },
    components:{
        mcqc,
        maq,
        mtfc,
        tf,
        sen
    },
    methods: {
      handleCommand(command) {

        this.componentName=command
        if(command=="mtfc"){this.title="MATCH THE FOLLOWING"}
        else if(command=="sen"){this.title="ARRANGE IN ORDER"}
        else if(command=="maq"){this.title="MAQ"}
        else if(command=="tf"){this.title="TRUE OR FALSE"}
        else{this.title="MCQ"}
      },
    }
  }
</script>
