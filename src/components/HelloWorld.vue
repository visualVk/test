<template>
  <div style="width: 100%">
    <el-row style="width: 100%">
      <el-col :span="2"><div style="width: 100%"></div></el-col>
      <el-col :span="10">
        <div class="block">
          <el-image :src="src">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="block">
          <el-image :src="dest">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <el-row style="height: 50px">
      height:{{height}}, weight:{{weight}}
    </el-row>
    <el-row>
      <input type="file" @change="selectFile" />
      <el-button @click="submitImage">上传</el-button>
    </el-row>
  </div>
</template>

<script>
import Axios from "axios";
let rq = Axios.create({
  timeout:30000
})
export default {
  name: "HelloWorld",
  data() {
    return {
      fileList: [],
      src: "",
      dest: "",
      height:0,
      weight:0,
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    upload: function () {
      console.log(this.$data.fileList[0]);
    },
    selectFile(file) {
      this.$data.fileList = file.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      let _this = this;
      reader.addEventListener("load", function () {
        _this.$data.src = this.result;
      });
    },
    async submitImage() {
      let formData = new FormData();
      formData.append("files", this.$data.fileList[0]);
      let p_res = await rq.post("/api/get_hw_img", formData, {
        "Content-Type": "multipart/form-data",
      });
      this.$data.height = p_res.data.height
      this.$data.weight = p_res.data.weight

      let res = await rq.post("/api/get_result");
      // let binary = ''
      // let bytes = new Uint8Array(res.data)
      // let len = bytes.byteLength
      // console.log(len)
      // for (var i = 0; i < len; i++) {
      //   binary += String.fromCharCode(bytes[i])
      // }
      // let encode = window.btoa(binary)
      this.$data.dest = "data:image/png;base64," + res.data;
      // console.log(encode)
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.block {
  height: 500px;
  width: 500px;
  background-color: #ccc;
}

.el-row {
  margin-bottom: 20px;
  height: 100%;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  min-height: 36px;
}
.el-image {
  height: 100%;
  width: 100%;
}
/* .bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
} */
</style>
