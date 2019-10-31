<template>
  <div class="container-header-nav-mine">
    <div
      v-if="info.id"
      class="title"
    >
      <div class="image-src">
        <mip-img
          v-if="info.avatar"
          :src="info.avatar"
          alt="头像"
        />
        <mip-img
          v-else
          src="https://xxd.smartstudy.com/v2/images/avatar-default.png"
          alt="默认头像"
        />
      </div>
      <div class="name">{{ info.name }}</div>
    </div>
    <div
      v-else
      class="title"
    >
      <div class="image-src">
        <mip-img
          src="https://xxd.smartstudy.com/v2/images/avatar-default.png"
          alt="默认头像"
        />
      </div>
      <slot />
    </div>
    <div
      v-if="info.id"
      class="items"
    >
      <a
        class="item"
        href="/personal/match-school-list.html"
      >
        我的选校
      </a>
      <a
        class="item"
        href="/personal/questions"
      >
        我的问答
      </a>
      <a
        class="item"
        href="/personal/home.html"
      >
        用户中心
      </a>
    </div>
  </div>
</template>

<style scoped>

.container-header-nav-mine {
  width: 14.4rem;
  margin-top: 44px;
  height: calc(100vh - 44px);
  background-color: #39f;
}

.container-header-nav-mine .title {
  padding: 4.2rem 3.1rem 3.5rem;
  text-align: center
}

.container-header-nav-mine .title .image-src {
  margin: 0 auto 1.6rem;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
  background-color: #f2f2f2;
  overflow: hidden;
}

.container-header-nav-mine .title .name {
  font-size: 1.4rem;
  color: #fff;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}

.container-header-nav-mine .item {
  display: block;
  height: 4.5rem;
  line-height: 4.5rem;
  color: #fff;
  text-align: center;
  font-size: 1.6rem;
  text-decoration: none
}

.container-header-nav-mine .item.selected {
  background-color: #48a4ff
}
</style>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
      default: function () {
        return {}
      }
    }
  }
}
</script>
