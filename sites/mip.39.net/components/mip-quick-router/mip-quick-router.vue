<template>
  <div class="wrapper">
    <iframe v-if="iframeSrc" v-bind:src="iframeSrc" style="display: none;"></iframe>
    <slot></slot>
  </div>
</template>

<style scoped>
  .fucking-pic{display:none;}
</style>

<script>
export default {
  props: {
    packagename: {
      type: String,
      default () {
        return ''
      }
    },
    appRouter:{
      type: Boolean,
      default () {
        return true
      }
    },
    page:{
      type: String,
      default () {
        return ''
      }
    },
    params:{
      type: String,
      default () {
        return ''
      }
    },
    protocal:{
      type: String,
      default () {
        return 'http'
      }
    }
  },
  data () {
    return {
      iframeSrc:''
    }
  },

  methods:{
    convertToHash(str) {
      var hash = {};
      var list = str.split('&');
      for (var i = 0, len = list.length; i < len; i++) {
          var item = list[i];
          var sideList = item.split('=');
          if (sideList[0].length > 0) {
              hash[sideList[0]] = item.substr(sideList[0].length + 1);
          }
      }
      return hash;
    },
    typeofHuawei(){
        var userAgent = navigator.userAgent.toLowerCase();
        console.log(userAgent)
        if (userAgent) {
            var huaweibrowser = userAgent.indexOf("huaweibrowser");
            var android = userAgent.indexOf("android")
            var huawei = userAgent.indexOf("build/huawei");
            if (huaweibrowser >= 0) return 1;
            if (huawei >= 0) return 1;
            // if (0 > huawei && (huawei = userAgent.indexOf("build/honor")), android >= 0 && huawei >= 0) {
            //     if (userAgent.slice(android + 8, android + 9) >= 8) return 0
            // }
        }
        return 0
    },
    isEmptyObject(obj) {
      if (!obj) {
          return !0;
      }
      var t = void 0;
      for (t in obj) {
          if (obj.hasOwnProperty(t)) {
              return !1;
          }
      }
      return !0;
    }
  },
  
  created(){
    var packagename = this.packagename;
    var protocal = this.protocal
    var page = this.page
    var params = this.convertToHash(this.params)
    var appRouter = !!this.appRouter
    var query

    
    if(appRouter){
      let iframeSrc = '';

      if (this.isEmptyObject(params)) {
        var url = window.location.search;
        var index = url.indexOf('?');
        if (index > -1) {
            query = url.substr(1);
        }
      }else {
        var items = Object.keys(params).map(function (key) {
            return key + '=' + encodeURIComponent(params[key]);
        });
        query = items.join('&');
      }

      if(this.typeofHuawei()){
        iframeSrc = 'hap://app/'+packagename 
        if (page) {
          iframeSrc+= '/' + page
        }

        if (query) {
            iframeSrc +=   '?' + query
        }
      }else{
        iframeSrc = protocal +'://thefatherofsalmon.com?i='+packagename 
        if (page) {
          iframeSrc+= '&p='+page
        }

        if (query) {
            iframeSrc +=  '&a=' + encodeURIComponent(query);
        }
      }

          
      this.iframeSrc = iframeSrc

    }
    
   
  }
}
</script>