<template>
  <div class="question">
    <h1>常见问题</h1>
    <div class="pic">
      <img
        src="https://b.kuaifawu.com/static/image/zixun_head_sec.jpg"
        alt="">
    </div>
    <div class="main">
      <h2>注册登录</h2>
      <p>问：如何注册一个账号？</p>
      <p> 答：用手机号注册一个账号，也可以使用微博或QQ账号注册（首次登录需要补充资料）</p>
    </div>
    <div class="main">
      <h2>售前咨询</h2>
      <p>问：我有疑问该问谁？</p>
      <p> 答：有任何疑问可以直接拨打我们的客服专线：400-6683-666。我们会尽力解答您的疑问。</p>
    </div>
    <div class="main">
      <h2>如何支付</h2>
      <p> 问：有哪几种支付方式？ 答：目前网站上支持支付宝和网银支付，任选其一即可。 问：我没有支付宝和网银，怎么办？ 答：如果您没有这两种支付方式，可以通过银行汇款或当面支付，具体详情请与客服沟通联系。</p>
    </div>
    <div class="main">
      <h2>服务方式</h2>
      <p> 问：购买之后如何服务？</p>
      <p> 答：购买相应产品后，我们会立即有专人与你联系，提供一对一的专门服务。</p>
    </div>
    <div class="main">
      <p> 问：我需要一个法律服务，但是在网站上找不到对应的服务，怎么办？</p>
      <p> 答：目前网站上提供的都是标准化的服务，如果您需要其它服务，只要与法律或企业的工商财税方面相关，可以与我们的客服人员联系，我们会针对您的需求提供个性化的服务。</p>
    </div>
  </div>
</template>

<style scoped>
  .question{background:#fff;margin-top:0.01rem;padding-bottom:0.5rem;}
  .question .pic{width:92%;height:auto;margin:0 auto;}
  .question .pic img{width: 100%;height: 100%;}
  .question h1{font-size:22px;padding:0.15rem;}
  .question .main{padding:0.15rem;color:#666;}
  .main h2{font-weight:normal;font-size:24px;padding:0.2rem 0;}
  .main p{font-size:18px;}
</style>

<script>
export default {
  mounted () {
    console.log('This is my first custom component !')
  }
}
</script>
