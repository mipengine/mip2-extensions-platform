<template>
	<div id="">
		<div class="order-item">
			<div class="items-content">
				<h2 class="items-tit">{{destination}}</h2>
				<p class="items-info">出行天数{{day}}天</p>
			</div>
		</div>
		<div class="order-item">
			<div class="item-text">
				<p>请填写联系人信息，以便旅行顾问及时联系您</p>
			</div>
			<div class="submit-form-content">
				<ul class="form-list">
					<li class="form-li">
						<span>联系人</span>
						<div class="form-ipt">
							<input type="text" v-model="name" class="ipt" placeholder="请输入您的名字" />
						</div>
					</li>
					<li class="form-li">
						<span>手机号码</span>
						<div class="form-ipt">
							<input type="tel" v-model="phone" class="ipt" placeholder="请输入您的手机号码" />
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="actions">
			<button class="btn-normal" type="submit" @click="submitTap">提交需求</button>
		</div>
	</div>

</template>

<script>
	import axios from 'axios';
	import Vue from 'vue';
	import toast from 'vue-toasted';

	Vue.use(toast);
	let options = {
		position: 'top-center',
		duration: 2000,
	};
	export default {
		data() {
			return {
				destination: '美国',
				day: 0,
                name: '',
                phone: '',
			};
		},
		props: ["des", "days", "info", "tripid"],
		mounted() {
			this.destination = this.des;
			this.day = this.days;
            this.phone = this.getPhone();
		},
        watch: {
            info (val) {
                val = JSON.parse(val);
                this.name = val.userInfo.userinfo.nickname;
            }
        },
		methods: {
			submitTap: function() {
				var re = /^1\d{10}$/;
			 	if(this.name != '' && this.phone != '') {
					if(re.test(this.phone)) {
						var params = {};
						params['dest'] = this.destination;
						params['realname'] =  this.name;
						params['mobile'] =  this.phone;
						params['days'] =  this.day;
						params['fid'] =  'baidu_mip';
                        params['trip_id'] = this.tripid;
                        let headers = {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        };
                        let _data = [];
                        for(let k in params){
                            _data.push(k + '=' + params[k]);
                        }
						axios({
                            method: 'post',
                            url: "https://m.6renyou.com/we_service/save_order", 
                            data: _data.join('&'),
                            headers: headers,
                        }).then(res => {
							console.log("下单返回信息", res);
                            this.savePhone();
							if(parseInt(res.data.status) == 1) {
                                this.baiduCB(this.name, this.phone, this.info);
								MIP.viewer.open('/order/result');
							}else {
								Vue.toasted.show(res.data.message, options);
							}
						}).catch(err => {
							Vue.toasted.show('下单失败'+err.message, options);
						})
					} else {
						Vue.toasted.show('电话号码输入有误', options);
					}
				} else {
					Vue.toasted.show('请输入姓名和电话', options);
				}

			},
            savePhone () {
                let storage = new MIP.util.customStorage(0);
                storage.set('phone', this.phone);
            },
            getPhone () {
                let storage = new MIP.util.customStorage(0);
                return storage.get('phone');
            },
            baiduCB (name, phone, info) {
                let data = {
                    name,
                    phone,
                    info: JSON.parse(this.info),
                    dest: this.destination,
                    days: this.day,
                };
                axios.post('/order/callback/baidu', data).then(resp => {
                    console.log(resp.data);
                }).catch(err => {
                    console.log(err);
                });
            },
		}, 
	};
</script>

<style>

</style>
