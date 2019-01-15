<template>
  <div class="lists jobs">
    <div v-if="job_list.length<1"/>
    <div v-else>
      <mip-accordion
        sessions-key="job-list"
        animatetime="0.24">
        <section
          v-for="item in job_list"
          :key="item.jobsId">
          <h4>{{ item.jobsTopic }}<i/></h4>
          <div class="i_n_text mip-accordion-content">
            <span class="j-num" > 招聘人数：{{ item.jobsNum }}</span>
            <span class="j-sexneed "> 性别要求 :{{ item.j_ageNeed }}</span>
            <span class="j-jobsobj "> 招聘对象：{{ item.jobsObj }}</span>
            <span class="j-more">
              <a
                :href="item.thePageUrl"
                class="am-btn am-btn-more am-radius">
                查看详细
              </a>
            </span>
          </div>
        </section>
      </mip-accordion>
    </div>
  </div>
</template>

<style scoped>

.lists.jobs section {
  list-style: none;
  position: relative;
  border-bottom: 1px dashed #ededed;
}

.lists.jobs section a {
  display: block;
  width: 100%;
  height: 100%;
}

.lists.jobs section>h4 {
  display: block;
  overflow: hidden;
  height: 49px;
  padding-left: 50px;
  background: url(/mip/templates/default/images/icon-32x32-list-jobs.png) no-repeat 10px center;
  background-size: 23px;
  background-position: 15px center;
  white-space: nowrap;
}

.lists.jobs section>h4 {
  display: block;
  overflow: hidden;
  line-height: 50px;
  text-overflow: ellipsis;
  color: #000000;
  font-size: 17px;
  font-weight: 300;
}

.lists.jobs section h4 i {
  display: block;
  position: absolute;
  top: 0px;
  right: 5px;
  width: 50px;
  height: 50px;
  background-image: url(/mip/templates/default/images/icon-11x11-attributeitems.png);
  background-position: center;
  background-repeat: no-repeat;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  background-size: 10px;
  z-index: -1;
}

.lists.jobs section[expanded="open"] i {
  transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}

.lists.jobs section>div {
  display: none;
  background-color: #f1f0f5;
  color: #000;
  width: 100%;
}

.lists.jobs section>div>span {
  display: block;
  float: left;
  padding: 15px;
  width: 100%;
  font-size: 18px;
  line-height: 100%;
  text-align: left;
  font-weight: 300;
  background-repeat: no-repeat;
  background-position: 20px center;
  background-size: 23px;
  padding-left: 54px;
  border-bottom: 1px dashed #e2dbdb;
  margin-left: 0px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.lists.jobs section>div>span.j-num {
  background-image: url(/mip/templates/default/images/pro_icon.png);
}

.lists.jobs section>div>span.j-sexneed {
  background-image: url(/mip/templates/default/images/sex_icon.png);
}

.lists.jobs section>div>span.j-jobsobj {
  background-image: url(/mip/templates/default/images/boj_icon.png);
}

.lists.jobs section>div>span.j-more {
  padding-left: 15px;
}
.lists.jobs section>div>span.j-more .am-btn-more {
  font-size: 16px;
  background: #56676e;
  color: #e1eaec;
  height: 40px;
  border-radius: 3px;
  font-weight: 300;
  line-height: 40px;
  text-align: center;
}
</style>
<script>
export default {
  props: {
    src: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      job_list: []
    }
  },
  mounted () {
    fetch(this.src).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('job list went wrong!')
      }
    }).then(jobsinfos => {
      this.job_list = jobsinfos.data.items
      if (this.job_list.length > 0) {
        this.job_list.forEach(element => {
          if (element.thePageUrl === '' || element.thePageUrl == null) {
            element.thePageUrl = '/mip/templates/default/jobs_view.html?id=' + element.jobsId + '&editionId=' + element.editionId + '&sortId=&selType='
          }
        })
      }
    })
  }
}
</script>
