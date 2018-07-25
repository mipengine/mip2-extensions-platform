<template>
  <div
    :class="{'bg-stars-content':isbig}"
    class="stars-content">
    <div
      :style="'width:' + getWidth + '%'"
      class="stars-active-content">
      <span
        v-for="index in 5"
        :key="index"
        :class="{'bg-ac-img':isbig}"
        class="ac-img"
        @click="setStarsValue(index)"/>
    </div>
    <div class="stars-backgound-content">
      <span
        v-for="index in 5"
        :key="index"
        :class="{'bg-ac-img':isbig}"
        class="bg-img"
        @click="setStarsValue(index)"/>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    value: {
      type: Number,
      default: function () { return 0 }
    },
    disable: {
      type: Boolean,
      default: function () { return true }
    },
    isbig: {
      type: Boolean,
      default: function () { return false }
    }
  },
  data () {
    return {}
  },
  computed: {
    getWidth () {
      return this.value / 0.05
    }
  },
  mounted () {},
  methods: {
    setStarsValue (index) {
      if (this.disable) {
        return
      }
      this.$emit('input', index)
    }
  }
}
</script>
<style lang='less' scoped>
.stars-content {
  display: flex;
  height: 1.6rem;
  min-width: 8rem;
  overflow: hidden;
  position: relative;
}
.bg-stars-content {
  display: flex;
  height: 1.6rem;
  min-width: 16rem;
  overflow: hidden;
  position: relative;
}
.stars-active {
  position: absolute;
  display: inline-block;
  overflow: hidden;
  height: 1.6rem;
}
.stars-backgound-content,
.stars-active-content {
  position: absolute;
  display: inline-block;
  overflow: hidden;
  height: 1.6rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.stars-backgound-content span,
.stars-active-content span {
  display: inline-block;
  width: 1.6rem;
  height: 1.6rem;
}
.ac-img {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACRklEQVRIx72Vz0uTcRzHX3vWbNO1Q4eEspQgSy0VZVGXqBmZRId+EAZGdOjUpYtQ/QEdukcQRVFWeKhkxrK0Dt2yS+BaMg8NkiAGwQTRaX7fHXwWc7/c8NEPPDzw/vx4fd/fBz6PiwpjfuLMNcRtjJAxt3wd4buV9Lsqgn0724rRV4TLBgrR5usMT5Q7w6rQ4I2cQ7qAm+viMB07t1tSHCM3AtshiCWM9viCwz+cdtgPuAvobjvnnMP05PlajBKSvBiR4xCM5iU1VB9889sph9cBb4m8165Zm8P01AU3RoeQIhgFJFHEIZJmMOpB+lx9OLJUErg43edDOiCjfUiNGDVp+d2IURU2aBWgndMCRnGM4pK+YxRHmpTRhL9rbM61+OvSSYwGkQJablg5oJBWGvi/L1uT0QxSrwXcAwJlfsu1RAC4bwH1GwDLxDYLGNpA4FsLuAKMbwBsHLhsebY/TQEn1hkaBXr8xz+kLABP3UAGGl0nWMjfNfYHsjaNZ+ezFBByGBoDQjXHRpMZYcVqq6p/nrShUw7AEkB3zdH3yWwxb5dWNbxIAg8dAA7UHHk3nSsWW947HADWFRKLAfc7AGyqBNjsALDgjDzgQuLiVqDWAeCW2U/du8px6MR1ZmJvOcDVrlPAoP2YVWpbygE2lBgwCrR7W1/3etuHeoE2IFKiPu9PtKlAUbyAFgX6vS2vRrJFX0c4Cpya+3I6BNwBOnP6YuU4fAI8AP4CP4GrQPvm5pcjFAlfcPgjEAT67AMb4DHwKLf2H+dmMSB/GKp+AAAAAElFTkSuQmCC");
  background-repeat: no-repeat;
  background-size: contain;
}
.bg-img {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACz0lEQVRIx7XWT4jVVRTA8c8bRsOiMsdFf2hROo0p1Oas2kUtCoIIIkhFM4pMGwolQWpVBJEEQ6RFhsHAQBbUxkWLonYRnFVQTo7WJhsoixjJWpi2+J2B6b03M+/NjAcev9/vnHPP957z7j33tvQhmXk1xrCtVBN4ISIu9BpjsB8g3sYu/FPfT1eMJ3sN0Ooju2H8gBlsrrHf4TqMRMRUL3EG+sjuQEGORMQvEXEWR0p3oNcgPQEz82bsrFKOzTGNlW5n+axYhvuwCsci4tdZZb0fK9u+FQFm5g3YjX9xqIvLobLtLt8FpWPRZOYgbscm3IEHcB8mImL7PJOawFZ8gc9wCpP4MSIudgAz837NEr8LG3Vul99wT0Scnge4EV9jfZvpIk7jWxyNiM9bmfkYjs9xmtEs/8ma6Ul8GRF/LFL6dbgXd1ZlNmFEs21mZWsrM09hGHvxaURML/Y/9COZeRMewWFMtTLzMn6PiPXLC70o+ByGBqpsQ5k5egVhoxjC5AD24xLeysxdVwC2TdMgLuHFgYg4gR2leL8cVhI2Xp87IuLEAETEREFhfCWgtfrHNc1lTzH+v/Ez8wl8UNk+HhEfLRH2ED7RtLw9EfHOrK1bp3lWcwqcx7r2TtEDrKVpFEN4LiIOz7V39NKazRSurUH9ypoaN90Omy/DVbiAvyJi7RJL+jNuwfURMbNghpq2NKg5zZcqJ+s50m7oBtxcz++XAZyd7JZegFvaBnUr2Y3VIxfLcHnAzLwtMz/ENM5m5seZuWEBYEdJu10Th9sGycy1eBmjWI3Zo+pRPJyZ7+KViDhX+sn5gN0y/LOekZmrM/N5nNH0XHgTG+r3huZ6MYozmXkwM9cgyvd8e/Bu2+IpHMVlzfa4pkzHcTAifmrzvxWvYXvF+xtXVTLPRMR7CwIryH7NXXMIX+GliPjGApKZd+NVPKi5NbweER2Xrv8ArzsEZg/eOB0AAAAASUVORK5CYII=");
  background-repeat: no-repeat;
  background-size: contain;
}
.bg-ac-img{
  margin-right: 2rem;
}
.stars-active-content {
  z-index: 1;
}
</style>
