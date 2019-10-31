<template>
  <div class="wrapper">
    <div class="des-head">
      <span>
        普通搬家
      </span>
    </div>
    <div class="car-type">
      <div
        class="left arrow forbid car-actives"
        @touchend="swiper(0)"/>
      <div
        class="right arrow car-actives"
        @touchend="swiper(1)"/>
      <div class="content">
        <div class="swiper">
          <div class="slide slide-one">
            <div class="title">
              小面
            </div>
            <div class="car-img-div">
              <div class="car xiaomian"/>
            </div>
            <div class="desc">
              <p>1.7m*1.2m*1.1m</p>
              <p>长宽高</p>
            </div>
            <div class="modelCost">小面总费用=起步价+超里程费+楼层搬运费+额外服务费</div>
            <div class="des-destail">
              <ul>
                <li>
                  <div>起步价 (含10公里)</div>
                  <div>96元</div>
                </li>
                <li>
                  <div>超里程费</div>
                  <div>5元 / 公里</div>
                </li>
                <li>
                  <div>
                    <span>
                      楼层搬运费
                    </span>
                  </div>
                  <div>
                    <p>有电梯或住1楼，0元</p>
                    <p>2-3层，10元/层  </p>
                    <p>4-6层，20元/层</p>
                    <p>7层以上，30元/层</p>
                  </div>
                </li>
                <li>
                  <div>
                    <span>
                      额外服务费
                    </span>
                  </div>
                  <div>
                    <p>拆装</p>
                    <p>加人工</p>
                    <p>平地搬运费</p>
                    <p>多地装卸费</p>
                    <p>高速、停车费</p>
                  </div>
                </li>
              </ul>
              <div class="options">
                <p
                  v-show="!details.carOne.flag"
                  @click="detaisOption(details.carOne)"><span class="downs">展开查看详情</span><i/></p>
                <p
                  v-show="details.carOne.flag"
                  @click="detaisOption(details.carOne)"><span class="ups">收起查看详情</span><i/></p>
              </div>

            </div>
            <div
              v-show="details.carOne.flag"
              class="service-details">
              <ul>
                <li>
                  <div>
                    服务项目
                  </div>
                  <div>
                    收费标准
                  </div>
                </li>
                <li>
                  <div>
                    <span>
                      拆装
                    </span>
                  </div>
                  <div>
                    <p><span class="name">柜子: </span>10米/0.1米</p>
                    <p>按柜子长度计算，不足0.1米不计算</p>
                    <p><span class="name">床: </span>该车型无法容纳床的尺寸</p>
                    <p><span class="name">工位: </span>50/个</p>
                  </div>
                </li>
                <li>
                  <div>
                    <span>
                      平地搬运费
                    </span>
                  </div>
                  <div>
                    <p>100米内免费,超过部分: 20元/20米</p>
                    <p>(100米为房屋门口到停车的位置,不足20米按20米计算)</p>
                  </div>
                </li>
                <!-- <li>
                  <div>
                    <span>
                      拆装床
                    </span>
                  </div>
                  <div>
                    <p>1.8米(宽)以下，50元/张</p>
                    <p>1.8米(宽)及以上，100元/张</p>
                    <p>子母床，150元/张</p>
                  </div>
                </li> -->
                <!-- <li>
                  <div>
                    拆装工位
                  </div>
                  <div>
                    50/个
                  </div>
                </li> -->
                <li>
                  <div>
                    加工人
                  </div>
                  <div>
                    小面标配1人，额外增加工人，150元/人
                  </div>
                </li>
                <li>
                  <div>
                    <span>多地装卸费</span>
                  </div>
                  <div>
                    <p>搬家标准为2地，增加中途装卸地址，50元/地</p>
                    <p>增加装卸地址时，里程按实际行驶距离收费，爬楼、大件搬运等按实际情况收取搬运费</p>
                  </div>
                </li>
                <li class="li-last-second">
                  <div>
                    高速停车费
                  </div>
                  <div>
                    按实际产生由用户支付
                  </div>
                </li>
                <li class="li-last">
                  <div class="options ">
                    <p
                      v-show="details.carOne.flag"
                      @click="detaisOption(details.carOne)"><span class="ups">收起查看详情</span><i/></p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="service-des">
              <div>
                <p>服务说明</p>
              </div>
              <ul>
                <li
                  v-for="item in serviceDes"
                  :key="item.t"
                  v-text="item.t"/>
              </ul>
            </div>
          </div>
          <div class="slide slide-two">
            <div class="title">
              金杯
            </div>
            <div class="car-img-div">
              <div class="car jinbei"/>
            </div>
            <div class="desc">
              <p>2.7m*1.4m*1.2m</p>
              <p>长宽高</p>
            </div>
            <div class="modelCost">金杯总费用=起步价+超里程费+楼层搬运费+额外服务费</div>
            <div class="des-destail">
              <ul>
                <li>
                  <div>起步价 (含10公里)</div>
                  <div>166元</div>
                </li>
                <li>
                  <div>超里程费</div>
                  <div>5元 / 公里</div>
                </li>
                <li>
                  <div>
                    <span>
                      楼层搬运费
                    </span>
                  </div>
                  <div>
                    <p>有电梯或住1楼，0元</p>
                    <p>2-3层，12元/层  </p>
                    <p>4-6层，24元/层</p>
                    <p>7层以上，36元/层</p>
                  </div>
                </li>
                <li>
                  <div>
                    <span>
                      额外服务费
                    </span>
                  </div>
                  <div>
                    <p>拆装</p>
                    <p>加人工</p>
                    <p>平地搬运费</p>
                    <p>多地装卸费</p>
                    <p>高速、停车费</p>
                  </div>
                </li>
              </ul>
              <div class="options">
                <p
                  v-show="!details.carTwo.flag"
                  @click="detaisOption(details.carTwo)"><span class="downs">展开查看详情</span><i/></p>
                <p
                  v-show="details.carTwo.flag"
                  @click="detaisOption(details.carTwo)"><span class="ups">收起查看详情</span><i/></p>
              </div>
              <div
                v-show="details.carTwo.flag"
                class="service-details">
                <ul>
                  <li>
                    <div>
                      服务项目
                    </div>
                    <div>
                      收费标准
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>
                        拆装
                      </span>
                    </div>
                    <div>
                      <p><span class="name">柜子: </span>10米/0.1米</p>
                      <p>按柜子长度计算，不足0.1米不计算</p>
                      <p><span class="name">床: </span>宽1.8米以下，50元/张</p>
                      <p>宽1.8米及以上(含上下铺)，100元/张</p>
                      <p><span class="name">工位: </span>50/个</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>
                        平地搬运费
                      </span>
                    </div>
                    <div>
                      <p>100米内免费,超过部分: 20元/20米</p>
                      <p>(100米为房屋门口到停车的位置,不足20米按20米计算)</p>
                    </div>
                  </li>
                  <!-- <li>
                    <div>
                      <span>
                        拆装床
                      </span>
                    </div>
                    <div>
                      <p>1.8米(宽)以下，50元/张</p>
                      <p>1.8米(宽)及以上，100元/张</p>
                      <p>子母床，150元/张</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      拆装工位
                    </div>
                    <div>
                      50/个
                    </div>
                  </li> -->
                  <li>
                    <div>
                      加工人
                    </div>
                    <div>
                      金杯标配1人，额外增加工人，150元/人
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>多地装卸费</span>
                    </div>
                    <div>
                      <p>搬家标准为2地，增加中途装卸地址，50元/地</p>
                      <p>增加装卸地址时，里程按实际行驶距离收费，爬楼、大件搬运等按实际情况收取搬运费</p>
                    </div>
                  </li>
                  <li class="li-last-second">
                    <div>
                      高速停车费
                    </div>
                    <div>
                      按实际产生由用户支付
                    </div>
                  </li>
                  <li class="li-last">
                    <div class="options">
                      <p
                        v-show="details.carTwo.flag"
                        @click="detaisOption(details.carTwo)"><span class="ups slider2-span">收起查看详情</span><i/></p>
                    </div>
                  </li>
                </ul>
              </div>

            </div>

            <div class="service-des">
              <div>
                <p>服务说明</p>
              </div>
              <ul>
                <li
                  v-for="item in serviceDes"
                  :key="item.t"
                  v-text="item.t"/>
              </ul>
            </div>
          </div>
          <div class="slide slide-three">
            <div class="title">
              厢货
            </div>
            <div class="car-img-div">
              <div class="car xianghuo"/>
            </div>
            <div class="desc">
              <p>4.2m*1.8m*1.8m</p>
              <p>长宽高</p>
            </div>
            <div class="modelCost modelCost-xianghuo">厢货总费用=起步价+超里程费+楼层搬运费+平地搬运费+<br>
              大件搬运费+拆装费+额外服务费
            </div>
            <div class="des-destail">
              <ul>
                <li>
                  <div>起步价 (含10公里)</div>
                  <div>348元</div>
                </li>
                <li>
                  <div>超里程费</div>
                  <div>6元 / 公里</div>
                </li>
                <li>
                  <div>
                    <span>
                      楼层搬运费
                    </span>
                  </div>
                  <div>
                    <p>有电梯或住1楼，0元</p>
                    <p>2-3层，15元/层  </p>
                    <p>4-6层，30元/层</p>
                    <p>7层以上，45元/层</p>
                  </div>
                </li>
                <li>
                  <div>
                    <span>
                      平地搬运费
                    </span>
                  </div>
                  <div>
                    <p>40元/20米</p>
                    <p>以停车位置到楼梯或电梯距离计算</p>
                    <p>30米内免费，超过部分：40元/20米</p>
                    <p>不足20米按20米计算</p>
                  </div>
                </li>
                <li>
                  <div>
                    <span>
                      大件搬运费
                    </span>
                  </div>
                  <div>
                    <p>冰箱</p>
                    <p>电视</p>
                    <p>洗衣机</p>
                    <p>鱼缸</p>
                    <p>健身器材</p>
                    <p>钢琴</p>
                    <p>其他大件</p>
                  </div>
                </li>
                <div class="options option-three">
                  <p
                    v-show="!details.carThree.flag"
                    @click="detaisOption(details.carThree)"><span class="downs">展开查看详情</span><i/></p>
                  <p
                    v-show="details.carThree.flag"
                    @click="detaisOption(details.carThree)"><span class="ups">收起查看详情</span><i/></p>
                </div>
                <div
                  v-show="details.carThree.flag"
                  class="service-details service-details-xianghuo">
                  <ul>
                    <li>
                      <div>
                        服务项目
                      </div>
                      <div class="xianghuo-detail-title">
                        <span>收费标准</span>
                        <span class="price">价格</span>
                      </div>

                    </li>
                    <li>
                      <div>
                        <span>
                          冰箱
                        </span>
                      </div>
                      <div>
                        <p class="p-detail">
                          <span>体积＜200L</span>
                          <span>0元</span>
                        </p>
                        <p class="p-detail">
                          <span>200L≤ 体积＜280L</span>
                          <span>50元</span>
                        </p>
                        <p class="p-detail">
                          <span>280L ≤ 体积＜400L</span>
                          <span>100元</span>
                        </p>
                        <p class="p-detail">
                          <span>体积≥400L</span>
                          <span>200元</span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>
                          洗衣机
                        </span>
                      </div>
                      <div>
                        <p class="p-detail">
                          <span>波轮</span>
                          <span>0元</span>
                        </p>
                        <p class="p-detail">
                          <span>滚筒</span>
                          <span>50元</span>
                        </p>

                      </div>
                    </li>
                    <li>
                      <div>
                        <span>
                          电视
                        </span>
                      </div>
                      <div>
                        <p class="p-detail">
                          <span>50寸以下</span>
                          <span>0元</span>
                        </p>
                        <p class="p-detail">
                          <span>50寸及以上</span>
                          <span>50元</span>
                        </p>

                      </div>
                    </li>
                    <li>
                      <div>
                        <span>
                          健身器材
                        </span>
                      </div>
                      <div>
                        <p class="p-detail">
                          <span>重量＜50KG</span>
                          <span>0元</span>
                        </p>
                        <p class="p-detail">
                          <span>50KG ≤重量＜100KG</span>
                          <span>50元</span>
                        </p>
                        <p class="p-detail">
                          <span>100KG ≤重量＜200KG</span>
                          <span>100元</span>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>
                          鱼缸
                        </span>
                      </div>
                      <div>
                        <p class="p-detail">
                          <span>长＜1M</span>
                          <span>0元</span>
                        </p>
                        <p class="p-detail">
                          <span>1M≤长＜2M</span>
                          <span>150元</span>
                        </p>

                      </div>
                    </li>
                    <li>
                      <div>
                        <span>
                          沙发
                        </span>
                      </div>
                      <div>
                        <p class="p-detail">
                          <span>双人沙发</span>
                          <span>50元</span>
                        </p>
                        <p class="p-detail">
                          <span>三人沙发</span>
                          <span>100元</span>
                        </p>
                        <p class="p-detail">
                          <span>组合沙发</span>
                          <span>150元</span>
                        </p>

                      </div>
                    </li>
                    <li>
                      <div>
                        <span>
                          其他大件<br>
                          (体积大于1立方或<br>
                          者重量大于50kg
                        </span>
                      </div>
                      <div>
                        <p class="p-detail">
                          <span>重量＜50KG<br>
                            体积＜1m³
                          </span>
                          <span>0元</span>
                        </p>
                        <p class="p-detail">
                          <span>
                            50KG≤重量＜100KG<br>
                            或1m³≤体积＜1.5m³
                          </span>
                          <span>50元</span>
                        </p>
                        <p class="p-detail">
                          <span>
                            100KG≤重量＜200KG<br>
                            或1.5m³≤体积＜2m³
                          </span>
                          <span>100元</span>
                        </p>

                      </div>
                    </li>
                    <li class="li-last-second">
                      <div>
                        <span>
                          钢琴搬运
                        </span>
                      </div>
                      <div>
                        <p class="p-detail">
                          <span>高＜125</span>
                          <span>280元</span>
                        </p>
                        <p class="p-detail">
                          <span>高125及以上</span>
                          <span>380元</span>
                        </p>
                        <p class="p-detail">
                          <span>三角钢琴</span>
                          <span>500元</span>
                        </p>

                      </div>
                    </li>
                    <li class="li-last">
                      <div class="options ">
                        <p
                          v-show="details.carThree.flag"
                          @click="detaisOption(details.carThree)"><span class="ups">收起查看详情</span><i/></p>
                      </div>
                    </li>
                  </ul>
                </div>

                <li>
                  <div>
                    <span>
                      拆装费
                    </span>
                  </div>
                  <div>
                    <p>拆装柜子</p>
                    <p>拆装床</p>
                    <p>拆装工位</p>
                  </div>
                </li>
                <div class="options option-three">
                  <p
                    v-show="!details.carFour.flag"
                    @click="detaisOption(details.carFour)"><span class="downs">展开查看详情</span><i/></p>
                  <p
                    v-show="details.carFour.flag"
                    @click="detaisOption(details.carFour)"><span class="ups">收起查看详情</span><i/></p>
                </div>

                <div
                  v-show="details.carFour.flag"
                  class="service-details">
                  <ul>
                    <li>
                      <div>
                        服务项目
                      </div>
                      <div>
                        收费标准
                      </div>
                    </li>

                    <li>
                      <div>
                        <span>拆装柜子</span>
                      </div>
                      <div>
                        <p>10元/0.1米</p>
                        <p>1.按柜子长度计算，不足0.1米不计算</p>
                        <p>2.柜子不拆装，按拆装价格收取搬运费</p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>拆装床</span>
                      </div>
                      <div>
                        <p>宽1.8米以下，50元/张</p>
                        <p>宽1.8米及以上（含上下铺），100元/张</p>
                        <p>储物床，150元/张</p>
                        <p>子母床，200元/张</p>
                      </div>
                    </li>
                    <li class="li-last-second">
                      <div>
                        拆装工位
                      </div>
                      <div>
                        50/个
                      </div>
                    </li>
                    <li class="li-last">
                      <div class="options ">
                        <p
                          v-show="details.carFour.flag"
                          @click="detaisOption(details.carFour)"><span class="ups">收起查看详情</span><i/></p>
                      </div>
                    </li>
                  </ul>
                </div>

                <li>
                  <div>
                    <span>
                      额外服务费
                    </span>
                  </div>
                  <div>
                    <p>加人工</p>
                    <p>多地装卸费</p>
                    <p>高速、停车费</p>
                  </div>
                </li>
              </ul>
              <div class="options">
                <p
                  v-show="!details.carThreeTwo.flag"
                  @click="detaisOption(details.carThreeTwo)"><span class="downs">展开查看详情</span><i/></p>
                <p
                  v-show="details.carThreeTwo.flag"
                  @click="detaisOption(details.carThreeTwo)"><span class="ups">收起查看详情</span><i/></p>
              </div>

            </div>
            <div
              v-show="details.carThreeTwo.flag"
              class="service-details">
              <ul>
                <li>
                  <div>
                    服务项目
                  </div>
                  <div>
                    收费标准
                  </div>
                </li>
                <!-- <li>
                  <div>
                    <span>
                      拆装柜子
                    </span>
                  </div>
                  <div>
                    <p>10米/0.1米</p>
                    <p>1.按柜子长度计算，不足0.1米不计算</p>
                    <p>2.柜子不拆装，按拆装价格收取搬运费</p>
                  </div>
                </li> -->
                <!-- <li>
                  <div>
                    <span>
                      拆装床
                    </span>
                  </div>
                  <div>
                    <p>1.8米(宽)以下，50元/张</p>
                    <p>1.8米(宽)及以上，100元/张</p>
                    <p>子母床，150元/张</p>
                  </div>
                </li> -->
                <!-- <li>
                  <div>
                    拆装工位
                  </div>
                  <div>
                    50/个
                  </div>
                </li> -->

                <li>
                  <div>
                    加工人
                  </div>
                  <div>
                    4.2米厢货标配2~3人，额外增加工人，150元/人
                  </div>
                </li>
                <li>
                  <div>
                    <span>多地装卸费</span>
                  </div>
                  <div>
                    <p>搬家标准为2地，增加中途装卸地址，50元/地</p>
                    <p>增加装卸地址时，里程按实际行驶距离收费，爬楼、大件搬运等按实际情况收取搬运费</p>
                  </div>
                </li>
                <li class="li-last-second">
                  <div>
                    高速停车费
                  </div>
                  <div>
                    按实际产生由用户支付
                  </div>
                </li>
                <li class="li-last">
                  <div class="options ">
                    <p
                      v-show="details.carThreeTwo.flag"
                      @click="detaisOption(details.carThreeTwo)"><span class="ups">收起查看详情</span><i/></p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="service-des">
              <div>
                <p>服务说明</p>
              </div>
              <ul>
                <li>
                  1.预约订单服务开始前40分钟内取消，收取40元取消费；车辆到位且到达服务时间后，收取定金（小面60元，金杯100元，厢货150元）作为取消费；即时服务的订单，司机到位且等待20分钟后取消，收取40元取消费；
                </li>
                <li>
                  2.大量（超过1立方）的书籍和拆好的柜子、床、工位根据实际情况，按其他大件收费标准收取搬运费；
                </li>
                <li>
                  3、由于用户原因造成的司机到达后无法搬运、装车后无法出门的情况，等待30分钟以上的，收取30元／30分钟的误工费，为避免耽误您的时间，请提前打包好行李，备好出门条等；
                </li>
                <li>
                  4.如厢货车型搬运楼层涉及到搬运阁楼部分，额外收取50元楼层搬运费；
                </li>
                <li>
                  5.部分超大件无法用电梯搬运时，需要爬楼搬运则按楼层收费标准收取搬运费，7层以上的无电梯搬运需要与司机协商搬运费；
                </li>
                <li>
                  6.贵重物品及易碎物品（如红木家具、高档瓷器、古董、艺术品、玻璃器皿）需按实际情况与司机协商搬运费，如有问题请咨询客服热线：400-678-5966
                </li>
                <li>
                  7.周末搬家、夜间搬家均不收取额外费用；
                </li>
                <li>
                  8.搬家服务暂不支持空调、水电的拆装；
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import base from '../../common/utils/base.js'
import '../../common/utils/base.less'
base.setHtmlRem()
export default {
  props: {
    globaldata: {
      type: Object,
      default: function () { return {} }
    }
  },
  data () {
    return {
      test: false,
      details: {
        carOne: {
          flag: false
        },
        carTwo: {
          flag: false
        },
        carThree: {
          flag: false
        },
        carThreeTwo: {
          flag: false
        },
        carFour: {
          flag: false
        }
      },
      serviceDes: [
        {
          t:
            '1、预约订单服务开始前40分钟内取消，收取40元取消费；车辆到位且到达服务时间后，收取定金（小面60元，金杯100元，厢货150元）作为取消费；即时服务的订单，司机到位且等待20分钟后取消，收取40元取消费；'
        },
        {
          t:
            '2、由于用户原因造成的司机到达后无法搬运、装车后无法出门的情况，等待30分钟以上的，收取30元／30分钟的误工费，为避免耽误您的时间，请提前打包好行李，备好出门条等；'
        },
        {
          t: '3、小面和金杯车型，每车只包含司机一人为您搬运，无法搬运一人无法承担的大件物品，如您搬运物品涉及大件，请与司机共同搬运或提前与司机沟通，加一名搬运工人；'
        },
        {
          t: '4、周末搬家、夜间搬家均不收取额外费用；'
        },
        {
          t:
            '5、搬家服务暂不支持空调、水电的拆装；'
        }
      ],
      widths: '', // 当前页面宽度
      actionIndex: 1, // 当前车型
      maxIndex: 3,
      animatFlag: true,
      loadWidth: true
    }
  },
  mounted () {
    console.log('资费详情页面')
    this.getCurrentCityCarTypes()
  },
  methods: {
    // 请求当前城市的车型列表
    getCurrentCityCarTypes (city) {
      let globaldata = this.globaldata
      let focusCity = globaldata.ordercity
      let urls = base.url + '/Setting/getCityData?city=' + focusCity
      fetch(urls, {
        method: 'get'
      })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          if (response.data) {
            let service = response.data.setting.service
            for (let i = 0; i < service.length; i++) {
              if (service[i].type === 5) {
              // 如果当前城市车型小于3个  隐藏最后一个
                if (service[i].car.length < 3) {
                  this.maxIndex = 2
                } else {
                  this.maxIndex = 3
                }
                break
              }
            }
          }
        })
    },
    getwidth () {
      this.widths = MIP.viewport.getWidth()
    },
    swiper (type) {
      this.getwidth()
      let swiper = this.$element.querySelector('.swiper')
      let left = this.$element.querySelector('.left')
      let right = this.$element.querySelector('.right')
      let swTwo = 'swipertwo'
      let swThree = 'swiperthree'
      let forbid = 'forbid'
      left.classList.remove(forbid)
      right.classList.remove(forbid)

      if (type) { // 向左
        if (this.actionIndex !== this.maxIndex) {
          let width = '(-' + this.widths * this.actionIndex + 'px)'
          let t = 'translateX' + width
          if (this.actionIndex === 1) {
            swiper.classList.add(swTwo)
          }
          if (this.actionIndex === 2) {
            swiper.classList.add(swThree)
          }

          setTimeout(() => {
            MIP.util.css(swiper, {
              transform: t,
              'transition-duration': '200ms'
            })
            this.actionIndex += 1
            if (this.actionIndex === 3) {
              right.classList.add(forbid)
            }
          })
        } else {
          if (this.actionIndex === 3) {
            right.classList.add(forbid)
          }
        }
      } else { // 向右
        if (this.actionIndex !== 1) {
          let width = ''
          if (this.actionIndex === 2) {
            width = '(0px)'
            swiper.classList.remove(swTwo)
          }
          if (this.actionIndex === 3) {
            width = '(-' + this.widths + 'px)'
            swiper.classList.remove(swThree)
          }

          let t = 'translateX' + width

          setTimeout(() => {
            MIP.util.css(swiper, {
              transform: t,
              'transition-duration': '200ms'
            })
            this.actionIndex -= 1
            if (this.actionIndex === 1) {
              left.classList.add(forbid)
            }
          }, 0)
        } else {
          if (this.actionIndex === 1) {
            left.classList.add(forbid)
          }
        }
      }
    },

    detaisOption (item) {
      item.flag = !item.flag
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}
.des-head {
  background: #ffffff;
  height: 0.88rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.12rem;
}
.des-head span {
  position: relative;
  left: 0.665rem;
  color: #2a8afa;
}
.des-head span::after {
  content: "";
  display: inline-block;
  position: absolute;
  border-radius: 5px;
  width: 0.66rem;
  height: 0.08rem;
  background: #2a8afa;
  bottom: -0.24rem;
  left: 0.2rem;
}
.car-type {
  width: 100%;
  padding: 0.24rem 0;
  padding-bottom: 0;
  background: #ffffff;
}
.arrow {
  width: 0.49rem;
  height: 0.49rem;
  border: 0.05rem solid #666666;
  border-right: none;
  border-bottom: none;
  position: absolute;
  z-index: 10;
  top: 2.2rem;

}
.left {
  transform: rotate(-45deg);
  left: 1rem;
}
.right {
  transform: rotate(135deg);
  right: 1rem;
}
.left.forbid.arrow,
.right.forbid.arrow{
    border-color: #999;
}
.content {
  width: 1px;
  min-width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.swiper {
  position: relative;
  width: 300%;
  z-index: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  transform: translateX(0);
}
.swiper .slide {
    flex: 1;
  flex-shrink: 0;
  position: relative;
  height: 10px;
  width: 33.3333333%;
}
.swiper .slide-one {
  height: auto;
}

.swiper.swipertwo .slide {
  height: 10px;
}
.swiper.swipertwo .slide-two {
  height: auto;
}
.swiper.swiperthree .slide,
.swiper.swiperthree .slide-two {
  height: 10px;
}
.swiper.swiperthree .slide-three {
  height: auto;
}

.slide .title {
  font-size: 0.28rem;
  color: #333333;
  letter-spacing: 0.06px;
}

.slide-three {
  background: repeat-y;
}

.car-img-div {
  width: 2.24rem;
  height: 1.06rem;
  margin: 0 auto;
  margin-top: 0.26rem;
}
.car-img-div .car {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.car-img-div .xiaomian {
  background-image: url(https://www.lanxiniu.com/Public/baidumip/xiaomian.png);
}
.car-img-div .jinbei {
  background-image: url(https://www.lanxiniu.com/Public/baidumip/jinbei.png);
}
.car-img-div .xianghuo {
  background-image: url(https://www.lanxiniu.com/Public/baidumip/xianghuo.png);
}
.desc {
  margin-top: 0.2rem;
  font-size: 0.2rem;
}
.desc p:first-child {
  color: #333333;
}
.desc p:last-child {
  color: #666666;
}
.modelCost {
  width: 6.4rem;
  height: 0.44rem;
  margin: 0 auto;
  margin-top: 0.28rem;
  background: #2a8afa;
  border-radius: 0.54rem;
  font-size: 0.2rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.04px;
}
.modelCost-xianghuo {
  height: 0.76rem;
}
.des-destail {
  margin-top: 0.18rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.des-destail li {
  border-top: 0.02rem solid #e1e1e1;
  display: flex;
  align-content: center;
  font-size: 0.24rem;
  color: rgba(0, 0, 0, 0.87);
  padding: 0.2rem 0.6rem;
}
.des-destail li > div {
  flex: 1;
}
.des-destail li > div:first-child {
  text-align: left;
  position: relative;
}
.des-destail li:not(.li-last) > div:first-child span {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.des-destail li > div:last-child {
  text-align: right;
  font-size: 0.2rem;
}
.des-destail li > div:last-child p {
  margin-bottom: 0.05rem;
}
.options {
  font-size: 0.18rem;
  color: #429fff;
  background: #f3f3f3;
}
.options p {
  background: #ffffff;
  border-radius: 10px;
  border-top-left-radius: unset;
  border-top-right-radius: unset;
  padding: 0.1rem;
}
.option-three p {
  border-radius: 0 !important;
}
.options p span {
  position: relative;
}
.options p i {
  content: "";
  display: inline-block;
  width: 0.15rem;
  height: 0.15rem;
  border: 0.02rem solid #429fff;
  border-right: none;
  border-bottom: none;
  z-index: 10;
  margin-left: 0.1rem;
  position: relative;
}
.options p span.downs + i {
  top: -0.02rem;
  transform: rotate(-135deg);
}
.options p span.ups + i {
  top: 0.08rem;
  transform: rotate(45deg) !important;
}
.slider2-span {
  margin-left: -0.7rem;
}
.service-details {
  background: #f3f3f3;
  padding: 0 0.2rem;
}
.service-details ul {
  border: 0.02rem solid rgba(102, 102, 102, 0.2);
  border-top: unset;
  border-radius: 3.12px 3.12px 0.2rem 0.2rem;
  padding-left: 0.329rem;
  background: rgba(209, 230, 255, 0.2);
}
.service-details li {
  display: flex;
  font-size: 0.2rem;
  color: rgba(0, 0, 0, 0.87);
  padding: 0.2rem 0;
  border-bottom: 0.02rem solid rgba(102, 102, 102, 0.2);
}
.service-details li:first-child {
  font-size: 0.18rem;
  color: rgba(0, 0, 0, 0.54);
}
.service-details li > div:first-child:not(.options) {
  flex: 1;
  text-align: left;
  position: relative;
}
.service-details li > div:last-child {
  flex: 2;
  text-align: left !important;
}
.service-details li > div:first-child > span {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.service-details li > div:last-child p {
  padding: 0.19rem 0;
  border-top: 0.02rem solid rgba(0, 0, 0, 0.12);
}
.service-details li > div:last-child p:first-child {
  border-top: unset;
  padding-top: unset;
}
.service-details li > div:last-child p:last-child {
  padding-bottom: unset;
}
.service-details li.li-last-second,
.service-details li.li-last {
  border: unset;
}
.service-details li .options,
.service-details li .options p {
  background: unset;
  text-align: center;
  border: unset;
}
.xianghuo-detail-title .price {
  float: right;
  margin-right: 0.874rem;
}
.service-details-xianghuo .p-detail span:last-child {
  float: right;
  display: inline-block;
  width: 1.24rem;
}
.service-des {
  background: #f3f3f3;
  text-align: left;
  padding: 0.28rem 0.4rem;
}
.service-des li {
  font-size: 0.24rem;
  color: rgba(68, 68, 68, 0.87);
  letter-spacing: 0.07px;
  line-height: 1.5;
  margin-top: 0.2rem;
}

.service-des div p {
  font-size: 0.28rem;
  color: rgba(51, 51, 51, 0.87);
  position: relative;
  padding-left: 0.25rem;
}
.service-des div p::before {
  content: "";
  display: inline-block;
  position: absolute;
  border-radius: 5px;
  width: 0.08rem;
  height: 0.28rem;
  background: #2a8afa;
  top: 0.05rem;
  left: 0.05rem;
}
.name{
    font-weight: bold !important;
}
</style>
