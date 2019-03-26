<template>
  <div class="ad1" :class="{show:show}">
    <a :href="ad.href" class="npt__link">
      <mip-img layout="responsive" width="540" height="168" :src="ad.img"></mip-img>
    </a>
  </div>
</template>

<style scoped>
.ad1{
  display: none;
}
.ad1.show {
  display: block;
}
.npt__link {
  display: block;
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
      }
    };
  },
  mounted() {
    let sign = MIP.getData("sign");
    let url = "https://api.wangxiao.cn/app/ad.ashx";
    let url2 = url + "?AdTypeId=20181205183628518&sign=" + sign;
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
        })
        .catch(err => {
          throw "fail";
        });
    } catch (err) {
      console.err(err);
    }
  }
};
</script>
