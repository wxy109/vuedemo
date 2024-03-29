<template>
  <div>
    <input ref="file"
           type="file"
           class="file-input"
           accept="image/*"
           :multiple="multiple"
           @change="change"/>
  </div>
</template>

<script>
  import {Indicator, MessageBox} from 'mint-ui';
  //  M设定可以上传图片的大小
  const M = 7;
  const UNIT = 1024;
  const MAX_SIZE = M * UNIT * UNIT;

  /**
   * @author xx
   *
   * @desc 图片上传
   * @module @components/updatefile
   *
   * @example
   * import {updatefile} from @components
   * Vue.component(Updatefile.name, Updatefile)
   * <updatefile :multiple="multiple"
   *                :max="max"
   *                @refDom="getDom"
   *                @fileChange="fileChange">
   * </updatefile>
   */
  export default {
    name: 'updatefile',
    /**
     * @member {Object}
     * @name props
     * @property {Boolean} multiple 是否可以同时上传多个文件
     * @property {Number} max 最多一次可以上传多少张
     */
    props: {
      multiple: Boolean,
      max: Number
    },
    data() {
      return {

      };
    },
    mounted() {
      this.getDom();
    },
    methods: {
      // 获取dom元素外部点击触发
      getDom() {
        let file = this.$refs.file;
        this.$emit('refDom', file);
      },
      // 图片数量是否超过max张
      isOutNumber(files) {
        const MAX = this.max;
        if (files.length > MAX) {
          MessageBox({
            title: '提示',
            message: `一次最多允许上传${MAX}张！`
          });
          return true;
        } else {
          return false;
        }
      },
      change(e) {
        let files = e.target.files;
        // 如果超过设定的张数张，提示
        if (this.isOutNumber(files)) {
          return;
        }
        let len = files.length;
        for (let i = 0; i < len; i++) {
          if (window.FileReader && files[i]) {
            if (files[i].size <= MAX_SIZE) {
              Indicator.open();
              // 读取文件转化图片base64
              let fr = new FileReader();
              let self = this;
              fr.onload = (e) => {
                let w = 300;
                let h = 300;
                let file = files[i];
                let compressPic = function(base64) {
                  // 将压缩处理后的图片传递出去
                  self.$emit('fileChange', {base64, file, files});
                };
                self.canvasDataUrl(e.target.result, w, h, compressPic);
              };
              fr.onerror = (e) => {
                Indicator.close();
              };
              fr.readAsDataURL(files[i]);
            } else {
              MessageBox({
                title: '警告',
                message: `${files[i].name}图片尺寸过大，图片请小于7M！`
              });
            }
          }
        }
      },
       //  利用canvas压缩图片
      canvasDataUrl(data, w, h, callback) {
        let newImg = new Image();
        newImg.src = data;
        let imgWidth, imgHeight;
        newImg.onload = () => {
          let img = document.createElement('img');
          img.src = newImg.src;
          imgWidth = img.width;
          imgHeight = img.height;
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');
          if (imgWidth > imgHeight) {
            imgWidth = w * imgWidth / imgHeight;
            imgHeight = h;
          } else {
            imgHeight = h * imgHeight / imgWidth;
            imgWidth = w;
          };
          canvas.width = imgWidth;
          canvas.height = imgHeight;
          ctx.clearRect(0, 0, w, h);
          // 处理png格式图片背景变黑的问题
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
          let rate = 0.7;
          let base64 = canvas.toDataURL('image/jpeg', rate);
          callback(base64);
        };
      }
    }
  };
</script>
