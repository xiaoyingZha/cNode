<template>
    <div class="markdown-body">
      <div>
        <a href="#">RSS</a> | <a href="#">源码地址</a>
      </div>
      <div>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</div>
      <div class="foot-img-box">服务器赞助商为
        <a href="#"><img src="../assets/img/foot1.png" alt="ucloud"></a>，存储赞助商为
        <a href="#"><img src="../assets/img/foot2.png" alt="七牛云存储"></a>，由
        <a href="#"><img src="../assets/img/foot3.png" alt=" alinode"></a>提供应用性能服务。</div>
      <div>新手搭建 Node.js 服务器，推荐使用无需备案的 (<a href="#">DigitalOceanhttps://www.digitalocean.com/</a>)</div>
    </div>

</template>

<script>
    export default {
        name: "app_foot"
    }
</script>

<style>
  /*使用markdown-css*/
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    /*max-width: 980px;*/
    margin: 0 auto;
    padding: 45px;
  }
  .markdown-body > div{
    margin-bottom: 10px;
  }
  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }

  .foot-img-box img{
    height: 40px;
    vertical-align: middle;
  }
</style>
