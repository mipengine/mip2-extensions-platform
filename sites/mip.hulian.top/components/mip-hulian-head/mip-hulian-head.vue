<template>
  <mip-data>
    <script type="application/json">
      {{greeting}}
    </script>
  </mip-data>
</template>

<style scoped>
</style>

<script>
  let hashstr = location.hash.replace('#','');
  let params = hashstr.split('&');
  let type = params[1].replace('type=','');
  let arr;
  let tmpcookie;
  let reg = new RegExp("(^| )" + type+ 'ck' + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)){
    tmpcookie = JSON.parse(arr[2]);
  }
  let url = 'https://m.hulian.top/help/'+params[1].replace('type=','')+'/m/'+params[0].replace('id=','')+'.html'
  export default {
    props: [],
    computed: {
      greeting() {
        return {
          "url": url,
          "json":'{\"@context\": \'https://ziyuan.baidu.com/contexts/cambrian.jsonld\',\"@id\": \''+tmpcookie.url+'\',\"title\": \''+tmpcookie.title+'\',\"description\": \''+tmpcookie.des+'\',\"images\": [\''+tmpcookie.img+'\'],\"pubDate\": \''+tmpcookie.time+'\'}'
        };
      },
    }
  }
</script>
