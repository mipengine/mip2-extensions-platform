<style scoped>
.day-hd1{}
.day-hd1:after{
    background: url(~@/static/img/trip/i-arr-up.png) no-repeat;
    background-size: 14px 8px;
}
</style>

<template>
  <div class="trip-detail">
    <!-- 顶部图 -->
    <div class="topic-image">
      <ul class="banner-wrap">
        <li class="banner-slider">
          <mip-img :src="cover" />
        </li>
      </ul>
      <div class="topic-info-top">
        <h2 class="topic-title">{{ title }}</h2>
        <div class="topic-info">
          <div class="topic-inf2">
            <span>{{ days }}天</span>
            <span>{{ from_city_name }}出发</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 行程亮点 -->
    <div class="trip-commont">
      <div class="trip-commont-hd"><span>行程亮点</span></div>
      <div class="poi-special">
        <p
          v-for="(it, index) in feature"
          :key="index">{{ it }}</p>
      </div>
    </div>
    <!-- 特色景点 -->
    <div class="trip-commont">
      <div class="trip-commont-hd"><span>特色景点</span></div>
      <div class="specialSpotList">
        <ul class="clearfix">
          <li
            v-for="(item, index) in popular_sight"
            v-show="index < 4 || showMoreSight"
            :key="index">
            <a
              :href="host + '/sight/' + item.typeCode + '/' + item.id"
              mip-link>
              <div class="sp-img">
                <mip-img
                  :src="item.cover"
                  width="100%" />
                <span class="cy">{{ item.city_name }}</span>
              </div>
              <div class="t1"><p>{{ item.name }}</p></div>
            </a>
          </li>
        </ul>
        <div
          v-show="popular_sight.length > 4"
          class="spec-more">
          <a
            v-show="showMoreSight == false"
            href="javascript:void(0);"
            class="btn-specMore"
            @click="showMore">更多特色景点<i class="ic-poi"/></a>
          <a
            v-show="showMoreSight == true"
            href="javascript:void(0);"
            class="btn-specMore"
            @click="closeMore">收起特色景点<i class="ic-poi ic-flod"/></a><!-- 收起 -->
        </div>
      </div>
    </div>
    <!-- 行程概览 -->
    <div class="trip-commont trip-review">
      <div class="trip-commont-hd">
        <span>行程概览</span>
        <!-- 展开收起 -->
        <div class="trip-opr">
          <div class="checkbox">
            <input
              type="checkbox"
              @click="toggleStatus(-1)">
            <label/>
          </div>
        </div>
      </div>
      <div
        class="trip-content"
        style="margin-bottom:60px;">
        <!-- DAY -->
        <div
          v-for="(item, index) in day_list"
          :key="index"
          class="day-content-item">
          <div
            :class="{'day-hd1': item.status}"
            class="day-hd"
            @click="toggleStatus(index)">
            <div class="day-inf">
              <span class="day-number">{{ item.day }}</span>
            </div>
            <div class="day-city-list">
              {{ item.city_list.join(' → ') }}
            </div>
          </div>
          <div
            v-show="!item.status"
            class="day-bd">
            <div
              v-for="(sight, sight_index) in item.data"
              v-show="item.data.length > 0"
              :key="sight_index">
              <!-- 景点 -->
              <div
                v-if="sight.type == 'sight'"
                class="day-item day-item-arrow"
                @click="showSightDetail(sight.poi_id)">
                <i class="itrip itrip-spot"/>
                <div class="day-item-cont spot-inf">
                  <div class="day-img">
                    <mip-img :src="sight.cover" />
                  </div>
                  <div class="day-item-title">
                    <p>{{ sight.name }}</p>
                  </div>
                </div>
              </div>
              <!-- 活动 -->
              <div
                v-if="sight.type == 'show'"
                class="day-item day-item-arrow"
                @click="showShowDetail(sight.poi_id)">
                <i class="itrip itrip-activity"/>
                <div class="day-item-cont activity-inf">
                  <div class="day-img">
                    <mip-img :src="sight.cover" />
                  </div>
                  <div class="day-item-title">
                    <p>{{ sight.name }}</p>
                  </div>
                </div>
              </div>

            </div>
            <!-- 备注 -->
            <div
              v-if="item.desc != ''"
              class="day-item day-remark">
              <i class="itrip itrip-remark"/>
              <div class="day-item-cont remark-inf">
                {{ item.desc }}
              </div>
            </div>
          </div>
        </div>
        <!-- DAY  END -->
      </div>
    </div>
  </div>

</template>

<script>

export default {
  props: {
    'tripid': {
      type: Number,
      required: true
    },
    'host': {
      type: String,
      required: true
    }
  },
  data () {
    return {
      title: '',
      feature: [],
      popular_sight: [],
      day_list: [],
      days: 0,
      cover: '',
      from_city_name: '',
      showMoreSight: false,
      allStatus: true
    }
  },
  mounted () {
    fetch('https://m.6renyou.com/mip_service/get_trip_detail?id=' + this.tripid).then(resp => resp.json()).then(resp => {
      if (!resp || resp == null) return
      this.title = resp.title
      this.feature = resp.feature
      this.popular_sight = resp.popular_sight.map(it => {
        if (it.cover.indexOf('http') !== 0) {
          it.cover = 'https://m.6renyou.com/statics/img/default.png'
        }
        it.typeCode = it.type === 'sight' ? '1' : '2'
        return it
      })

      this.day_list = resp.day_list.map(d => {
        d.status = true
        return d
      })
      this.days = resp.days
      this.cover = resp.cover
      this.from_city_name = resp.from_city_name
    }).catch(err => {
      console.log(err.message)
    })
  },
  methods: {
    showMore () {
      this.showMoreSight = true
    },
    closeMore () {
      this.showMoreSight = false
    },
    toggleStatus (index) {
      let list = this.day_list
      if (index > -1) {
        list[index].status = !list[index].status
      } else {
        this.allStatus = !this.allStatus
        list = list.map(l => {
          l.status = this.allStatus
          return l
        })
      }
      this.day_list = list
    },
    showSightDetail (poi) {
      MIP.viewer.open(this.host + '/sight/1/' + poi)
    },
    showShowDetail (poi) {
      MIP.viewer.open(this.host + '/sight/2/' + poi)
    }
  }
}
</script>
