export default class MIPExample extends MIP.CustomElement {
  build () {
    var ifswb = false
    var downHref = document.querySelector('.f-information').dataset.durl
    var noAd = ['6071.com','hsxyb.com','tj.tcyl77.com','tj.chenjianxiang.com','http://g.','http://tj.','moban.com','down1.qianghongbaoyo.com','yiwan.com','down2.guopan.cn','dl.guopan.cn','guopan.cn','duowan.com','ugame.uc.cn','ugame.9game.cn','360.cn','ewan.cn','anfan.com','duokoo.baidu.com','caohua.com','456.com.cn','miyugame.com','sifuba.net','btsysf.com','pyw.cn','sy217.com','17byh.com','xinkuai.com','s.qq.com','down.nntczn.com','down.bugeyu.com','open.play.cn','hgame.com','yxgames.com','ad677.com','sp.ulxue.com','xzsp.9pj8m.com','ydb.vaatn.com','xzsp3.zhanyu55.com','sp2.vaatn.com','sp2.ftaem.cn','tu.apk17.com','tt.wang6g.com','chenjianxiang.com','cyhy8.com','eoemarket.com','haowanyou.com','112wan.com','paojiao.cn','jiyw.com','66shouyou.com','downfx2.cmge.com','unionsy.com','phzdownload.gllkgame.com','hsxizhi.com','dlsutong.cn','602.com','ind9ed.com','63yx.com','6513.com','yileyoo.com','kingcheergame.com','gzjykj.com','songshugame.cn','myx916.com','ksyun.com','xmwan.com','fire2333.com','aliyuncs.com','youdiancx.com','myqcloud.com','yixin.im','yx.127.net','163.com','uri6.com','nikkigames.cn','papa91.com','84fk.com','dovoscape.com','108jz.com','693975.com','niuboli.com','tanwan.com','twanxi.com','huangxiu1.com','jjyx.com','guaishou66.com','duoyi.com','3737.com','leishengame.com','shangshiwl.com','aoingame.com','faxianapk.com','6xwan.com','7gwan.com','youximao.com','zwyouxi.com','happyelements.cn','qiyutianxia.com','yingxiong.com','play800.cn','tpxl.com','xiaodiyouxi.com','bamenzhushou.com','youximax.com','duomiwan.com','66bay.com','btgame99.com','xxzhushou.cn','dongyouxi666.com','277sy.com','wpscdn.cn','inmome.com','185sy.com','anfeng.com','tuanyx.com','game-center.cn','milu.com','xyzs.com','3733.com','kepan365.com','233xyx.com','xzsp3.nevehicle.cn']    
    for (let i = 0; i < noAd.length; i++) {
      if (downHref.indexOf(noAd[i]) > -1) {
          ifswb = true
      }
    }
    var iosmoney = document.querySelector('.f-information').dataset.ismoney
    var special = document.querySelector('.f-information').dataset.special
    if (iosmoney == 1) {
      ifswb = true;
    }
    if (special == 4) {
      ifswb = false;
    }
    if (special == 10) {
      ifswb = false;
    }
    if (special == 11) {
      ifswb = false;
    }
    if (special == 20) {
      ifswb = false;
    }
    var openurl = document.referrer.substr(0,20);
    if (openurl.indexOf('qqtn') == -1 && openurl.indexOf('baidu') == -1 && openurl != '' && !ifswb && /android/i.test(navigator.userAgent) && downHref.indexOf('/down.asp') == -1) {
      document.getElementById("address").setAttribute('data-ci','0')
      document.getElementById("address").classList.add("f-bgbtn")
      document.getElementById("address").innerHTML = '点击下载'
      document.getElementById("address").onclick = function () {
        if (document.querySelector('.f-bgbtn').dataset.ci == '0') {
          document.getElementById("address").setAttribute('data-ci','1')
          document.getElementById("address").href = 'http://tj.chenjianxiang.com/0006/6874';
        } else {
          document.getElementById("address").href = downHref
        }
      }
    }
  }
}