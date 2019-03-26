<template>
  <mip-fixed type="top" class="mask" :class="{show:show}">
    <div class="maskBox">
      <a :href="ad.href" class="maskLink">
        <mip-img layout="responsive" width="458" height="742" :src="ad.img" alt ></mip-img>
      </a>
      <div class="maskClose" @click="closeMask">&times;</div>
    </div>
  </mip-fixed>
</template>

<style scoped>
.mask {
  /* width: 100vw; */
  height: 100vh;
  background: rgba(0, 0, 0, 0.36);
  /* position: absolute; */
  /* top: 0; */
  /* left: 0; */
  /* z-index: 10; */
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
}
.mask.show {
  display: flex;
}
.maskBox {
  width: 60%;
  position: relative;
}

.maskLink img {
  max-width: 100%;
  display: block;
}

.maskClose {
  font-size: 22px;
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.361);
  padding: 3px;
  line-height: 1;
  color: #fff;
  z-index: 12;
}
</style>

<script>
export default {
  data() {
    return {
      show: false,
      ad: {
        href: "",
        img: ""
      },
      sign: ""
    };
  },
  mounted() {
    let sign = MIP.getData("sign");
    let url = "https://api.wangxiao.cn/app/ad.ashx";
    let url2 = url + "?AdTypeId=20181205190706638&sign=" + sign;
    try {
      fetchJsonp(url2, {
        timeout: 3000
      })
        .then(res => res.json())
        .then(data => {
          return new Promise((res, rej) => {
            if (data.State === 1 && data.Data.length) {
              res(data.Data);
            } else {
              rej(data.State);
            }
          });
        })
        .then(data => {
          // console.log(data[0])
          this.show = true;
          this.ad = data[0];
        });
    } catch (err) {
      console.err(err);
    }
  },
  methods: {
    closeMask() {
      this.show = false;
    }
  }
};

// $(function() {
//   $.ajax({
//     url: "https://api.wangxiao.cn/app/ad.ashx",
//     data: {
//       AdTypeId: "20181205190706638",
//       sign: "jz2"
//     },
//     dataType: "jsonp",
//     success: function(data) {
//       if (data.State == 1) {
//         if (data.Data instanceof Array) {
//           $(".mask").css("display", "flex");
//           if (data.Data[0].kf) {
//             $(".maskLink")
//               .removeAttr("href")
//               .addClass("zixun");
//           } else {
//             $(".maskLink").attr("href", data.Data[0].href);
//           }
//           $(".maskLink img").attr("src", data.Data[0].img);
//         }
//       } else {
//         // 失败
//       }
//     }
//   });
// });
// $(".maskBox").on("click", ".maskLink.zixun", function() {
//   window.NTKF.im_openInPageChat(NTKF_PARAM.settingid);
// });
// $(".mask").on("click", function(e) {
//   e.stopPropagation();
//   $(this).hide();
// });
// $(".maskClose").on("click", function() {
//   $(this)
//     .parents(".mask")
//     .hide();
// });
</script>
