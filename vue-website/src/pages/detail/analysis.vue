<template>
	<!--分析页面-->
	<div class="sales-board">
		<div class="sales-board-intro">
			<h2>流量分析</h2>
			<p>是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
		</div>

		<!--购买Form-->
		<div class="sales-board-form">
			<div class="sales-board-line">
				<div class="sales-board-line-left">
					购买数量：
				</div>
				<div class="sales-board-line-right">
					<!--加减组件,自定义on-change事件触发onParamChange函数-->
					<v-counter @on-change="onParamChange('buyNum', $event)"></v-counter>
				</div>
			</div>
			<div class="sales-board-line">
				<div class="sales-board-line-left">
					产品类型：
				</div>
				<div class="sales-board-line-right">
					<!--选择组件,传入buyTypes参数列表,自定义on-change事件触发onParamChange函数-->
					<v-selection :selections="buyTypes" @on-change="onParamChange('buyType', $event)"></v-selection>
				</div>
			</div>
			<div class="sales-board-line">
				<div class="sales-board-line-left">
					有效时间：
				</div>
				<div class="sales-board-line-right">
					<!--单选组件,传入periodList参数列表,自定义on-change事件触发onParamChange函数-->
					<v-chooser :selections="periodList" @on-change="onParamChange('period', $event)"></v-chooser>
				</div>
			</div>
			<div class="sales-board-line">
				<div class="sales-board-line-left">
					产品版本：
				</div>
				<div class="sales-board-line-right">
					<!--多选组件-->
					<v-mul-chooser :selections="versionList" @on-change="onParamChange('versions', $event)"></v-mul-chooser>
				</div>
			</div>
			<div class="sales-board-line">
				<div class="sales-board-line-left">
					总价：
				</div>
				<div class="sales-board-line-right">
					{{ price }} 元
				</div>
			</div>
			<div class="sales-board-line">
				<div class="sales-board-line-left">&nbsp;</div>
				<div class="sales-board-line-right">
					<div class="button" @click="showPayDialog">
						立即购买
					</div>
				</div>
			</div>
		</div>

		<!--其他说明-->
		<div class="sales-board-des">
			<h2>产品说明</h2>
			<p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>

			<h3>用户行为指标</h3>
			<ul>
				<li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
				<li>用户在网站的停留时间；</li>
				<li>用户来源网站（也叫“引导网站”）；</li>
				<li>用户所使用的搜索引擎及其关键词；</li>
				<li>在不同时段的用户访问量情况等。</li>
			</ul>

			<h3>浏览网站方式</h3>
			<ul>
				<li>用户上网设备类型</li>
				<li>用户浏览器的名称和版本</li>
				<li>访问者电脑分辨率显示模式</li>
				<li>用户所使用的操作系统名称和版本</li>
				<li>用户所在地理区域分布状况等</li>
			</ul>
		</div>

		<!--遮罩层-->
		<my-dialog :is-show="isShowPayDialog" @on-close="hidePayDialog">
			<!--购买列表-->
			<table class="buy-dialog-table">
				<tr>
					<th>购买数量</th>
					<th>产品类型</th>
					<th>有效时间</th>
					<th>产品版本</th>
					<th>总价</th>
				</tr>
				<tr>
					<td>{{ buyNum }}</td>
					<td>{{ buyType.label }}</td>
					<td>{{ period.label }}</td>
					<td>
						<span v-for="item in versions">{{ item.label }}</span>
					</td>
					<td>{{ price }}</td>
				</tr>
			</table>
			<h3 class="buy-dialog-title">请选择银行</h3>
			<bank-chooser @on-change="onChangeBanks"></bank-chooser>
			<div class="button buy-dialog-btn" @click="confirmBuy">
				确认购买
			</div>
		</my-dialog>
		
		<!--错误信息-->
		<my-dialog :is-show="isShowErrDialog" @on-close="hideErrDialog">
			支付失败！
		</my-dialog>
		<check-order :is-show-check-dialog="isShowCheckOrder" :order-id="orderId" @on-close-check-dialog="hideCheckOrder"></check-order>
	</div>
</template>

<script>
	import VSelection from '../../components/base/selection'
	import VCounter from '../../components/base/counter'
	import VChooser from '../../components/base/chooser'
	import VMulChooser from '../../components/base/multiplyChooser'
	import Dialog from '../../components/base/dialog'
	import BankChooser from '../../components/bankChooser'
	import CheckOrder from '../../components/checkOrder'
	//本地数据
	import _ from 'lodash'
	export default {
		//组件列表
		components: {
			VSelection,
			VCounter,
			VChooser,
			VMulChooser,
			MyDialog: Dialog,
			BankChooser,
			CheckOrder
		},
		data() {
			return {
				//购买数量
				buyNum: 0,
				//产品类型
				buyType: {},
				//产品版本
				versions: [],
				//有效时间
				period: {},
				//价格
				price: 0,
				//产品版本列表
				versionList: [{
						label: '客户版',
						value: 0
					},
					{
						label: '代理商版',
						value: 1
					},
					{
						label: '专家版',
						value: 2
					}
				],
				//有效时间列表
				periodList: [{
						label: '半年',
						value: 0
					},
					{
						label: '一年',
						value: 1
					},
					{
						label: '三年',
						value: 2
					}
				],
				//产品类型列表
				buyTypes: [{
						label: '入门版',
						value: 0
					},
					{
						label: '中级版',
						value: 1
					},
					{
						label: '高级版',
						value: 2
					}
				],
				//是否显示购买列表遮罩
				isShowPayDialog: false,
				//银行ID
				bankId: null,
				//订单ID
				orderId: null,
				//是否检测
				isShowCheckOrder: false,
				//错误信息
				isShowErrDialog: false
			}
		},
		//事件对象
		methods: {
			//当Form表单修改时
			onParamChange(attr, val) {
				this[attr] = val
				this.getPrice()
			},
			//获得价格
			getPrice() {
				//获得当前版本列表,map函数进行遍历,返回数组
				let buyVersionsArray = _.map(this.versions, (item) => {
					return item.value
				})
				//请求参数
				let reqParams = {
					buyNumber: this.buyNum,
					buyType: this.buyType.value,
					period: this.period.value,
					version: buyVersionsArray.join(',')
				}
				//发送请求,原来为post方法,为了防止改变
				this.$http.get('/api/getPrice', reqParams)
					.then((res) => {
						this.price = res.data.amount
					})
			},
			//显示购买弹窗
			showPayDialog() {
				this.isShowPayDialog = true
			},
			//隐藏购买弹窗
			hidePayDialog() {
				this.isShowPayDialog = false
			},
			//隐藏错误弹窗
			hideErrDialog() {
				this.isShowErrDialog = false
			},
			//隐藏检查订单弹窗
			hideCheckOrder() {
				this.isShowCheckOrder = false
			},
			//选择银行触发函数
			onChangeBanks(bankObj) {
				this.bankId = bankObj.id
			},
			//后台校验购买订单
			confirmBuy() {
				let buyVersionsArray = _.map(this.versions, (item) => {
					return item.value
				})
				let reqParams = {
					buyNumber: this.buyNum,
					buyType: this.buyType.value,
					period: this.period.value,
					version: buyVersionsArray.join(','),
					bankId: this.bankId
				}
				//创建订单
				this.$http.post('/api/createOrder', reqParams)
					.then((res) => {
						this.orderId = res.data.orderId
						this.isShowCheckOrder = true
						this.isShowPayDialog = false
					}, (err) => {
						this.isShowBuyDialog = false
						this.isShowErrDialog = true
					})
			}
		},
		//初始化数据
		mounted() {
			this.buyNum = 1
			this.buyType = this.buyTypes[0]
			this.versions = [this.versionList[0]]
			this.period = this.periodList[0]
			this.getPrice()
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.buy-dialog-title {
		font-size: 16px;
		font-weight: bold;
	}
	
	.buy-dialog-btn {
		margin-top: 20px;
	}
	
	.buy-dialog-table {
		width: 100%;
		margin-bottom: 20px;
	}
	
	.buy-dialog-table td,
	.buy-dialog-table th {
		border: 1px solid #e3e3e3;
		text-align: center;
		padding: 5px 0;
	}
	
	.buy-dialog-table th {
		background: #4fc08d;
		color: #fff;
		border: 1px solid #4fc08d;
	}
</style>