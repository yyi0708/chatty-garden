<template>
    <view class="page-wrap">
		<!-- 个人信息 -->
		<view class="user-info"  @click="drupPage({data: { link: PersonLink }})">
			<view class="base-info">
				<view class="profile">
					<image mode="widthFix" :src="baseInfo.avatar"></image>
				</view>
				<view class="nick-name">
					<text>{{ baseInfo.nickname || '登录/注册' }}</text>
					<text class="number">{{  `会员号: ${baseInfo.userNo || '-'}`}}</text>
				</view>
			</view>
		</view>
		<view class="container">
			<!-- 我的资产 -->
			<view class="user-property">
				<view class="vip" @click="feature">
					<view class="vip-tips">
						<image mode="widthFix" :src="staticImgMap.property_03"></image>
						<text>尊享专属特权</text>
					</view>
					<view class="vip-btn">
						<text>去开通</text>
					</view>
				</view>
				<view class="property" @click.stop="drupPage({data: { link: giftCardLink }})">
					<view class="property-left">
						<view class="property-item">
							<image mode="widthFix" :src="staticImgMap.property_01"></image>
							<text>我的资产</text>
						</view>
						<image mode="widthFix" :src="staticImgMap.property_02"></image>
					</view>
					<view class="property-right">
						<view class="property-content" @click.stop="drupPage({data: { link: v.link }})" v-for="(v, i) in property" :key="i">
							<text>{{ v.data }}</text>
							<text>{{ v.label }}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 我的订单 -->
			<zf-function-bar-card 
				title="我的订单"
				:content="MyOrderMap"
				@tap="drupPage"
			>
				<template v-slot:title-extend>
					<view class="order-opt" @click="drupPage({data: { link: OrderLink }})">
						<text>全部订单</text>
						<image mode="widthFix" :src="staticImgMap.order_06"></image>
					</view>
				</template>
				<template v-slot:suffix>
					<swiper v-if="transportOderList.length" class="swiper" circular :indicator-dots="indicatorDots" :autoplay="true" :vertical="true">
						<swiper-item class="swiper-item" v-for="(v,i) in transportOderList" :key="i">
							<view class="order-extra" @click="drupLogistics(v.deliveryNo)">
								<image mode="widthFix" :src="v.mainImg"></image>
								<view class="item-right">
									<view class="order-status">
										<text>{{ v.routeStatusDesc }}</text>
										<image mode="widthFix" :src="staticImgMap.order_06"></image>
									</view>
									<view class="order-time"  v-if="v.arriveTime">
										<text>预计</text>
										<text>{{ v.arriveTime }}</text>
										<text>送达</text>
									</view>
									<view class="order-time"  v-else>
										<text>{{ v.lastRouteDetail }}</text>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</template>
			</zf-function-bar-card>
			<!-- 我的服务 -->
			<zf-function-bar-card 
				title="我的服务"
				:content="MyServer"
				textColor="#666666"
				fontSize="22rpx"
				@tap="drupPage"
			>
			</zf-function-bar-card>
			<!-- 为你推荐 -->
			<!-- <view class="my-server">
				
			</view> -->
		</view>
    </view>
</template>

<script>
import { MyOrderMap, MyServer, OrderLink, staticImgMap, PersonLink } from '.'

const giftCardLink = '/pages/my/card/card'

export default {
	name: 'personal',
    data() {
        return {
			MyOrderMap,
			MyServer,
			OrderLink,
			PersonLink,
			giftCardLink,
			property: [
				{
					type: 'cardNum',
					label: '福卡数',
					link: `${giftCardLink}?index=0`,
					data: 0
				},
				{
					type: 'expireSoonNum',
					label: '快过期',
					link: `${giftCardLink}?index=0`,
					data: 0
				},
				{
					type: 'invalidNum',
					label: '已过期',
					link: `${giftCardLink}?index=1`,
					data: 0
				}
			],
			staticImgMap,
			baseInfo: {
				avatar: staticImgMap.default_icon,
				nickname: '',
				userNo: ''
			},
			transportOderList: [],
			token: ''
        }
    },
    methods: {
        async init() {
			uni.showLoading({
				title: '正在加载...',
				icon: 'loading',
				mask: true
			})
			
			this.token = !!uni.getStorageSync('zf_token')
			await Promise.allSettled([this.getUserInfo(),this.getCardInfo(), this.getTransportOder()])

			uni.hideLoading()
        },
		feature() {
			this.zfapi.toast('功能暂未开放，敬请期待！')
		},
		// 导航
		drupPage({ data }) {
			const token = !!uni.getStorageSync('zf_token')
			if (!token) {
				uni.navigateTo({
					url: "/pages/common/login/login?redirectUrl="+encodeURIComponent(`/pages/tabbar/my/my`)
				})
				return
			}

			if (!data) return
			if (data.title && data.title === '在线客服') {
				return this.getContacter()
			}
			if (data.title && data.title === '退款/售后') {
				return this.feature()
			}
			if(!data.link) return

			uni.navigateTo({
				url: data.link,
			});
		},
		// getUserInfo() {
		// 	uni.getStorage({
		// 		key: 'zf_user_info',
		// 		success: (res) => {
		// 			if (res.data) this.baseInfo = JSON.parse(res.data)
		// 		}
		// 	});
		// },
		async getUserInfo() {
			try {
				const token = !!uni.getStorageSync('zf_token')
				if (!token) return

                const { data } = await this.zfapi.request('/butterfly-service/customer/personalInfo', 'post', {})

                this.baseInfo = data
            } catch (error) {
                throw error
            }
		},
		// 获取卡劵信息
		async getCardInfo() {
			try {
				const token = !!uni.getStorageSync('zf_token')
				if (!token) return

				const res = await this.zfapi.request("/bee-service/ycard/myCardCount", "post")
				const { cardNum, expireSoonNum,  invalidNum } = res.data

				this.property.forEach(ele => {
					ele.data = ele.type === 'cardNum' ? cardNum : ele.type === 'expireSoonNum' ? expireSoonNum : ele.type === 'invalidNum' ? invalidNum : null
				});
			} catch (error) {
				throw error
			}
		},
		// TODO: 物流页面
		// 获取运输中订单物流信息
		async getTransportOder() {
			try {
				const token = !!uni.getStorageSync('zf_token')
				if (!token) return

				const { data } = await this.zfapi.request("/eagle-service/order/ordersInTransit", "post")
				
				this.transportOderList = data
			} catch (error) {
				throw error
			}
		},
		// 获取物流信息
		async getTransportInfo(deliveryNo = '') {
			try {
				const { data } = await this.zfapi.request("/eagle-service/order/orderLogistic", "post", { deliveryNo })
				
				return data
			} catch (error) {
				throw error
			}
		},
		// 联系我们
		async getContacter() {
			try {
				uni.showLoading({
					title: '正在加载...',
					icon: 'loading',
					mask: true
				})
				const { data } = await this.zfapi.request("/butterfly-service/mall/contacterMe", "get")
				const phone = data.contacterPhone
				const { platform } = uni.getSystemInfoSync()
				if (platform === 'ios'){
					uni.makePhoneCall({
						phoneNumber:phone
					})
				} else {
					uni.showActionSheet({
						itemList: [phone, '呼叫'],
						success:function(res){
							if(res.tapIndex==1){
								uni.makePhoneCall({
								phoneNumber: phone,
								})
							}
						}
					})
				}
			} catch (error) { 
				throw error
			} finally {
				uni.hideLoading()
			}
		},
		// 跳转物流页面
        drupLogistics(deliveryNo) {
            uni.navigateTo({
                url: `/pages/my/logistics/logistics?deliveryNo=${deliveryNo}`,
            });
        },
    },
    onShow() {
        this.init()
    },
    onPullDownRefresh() {
    },
    onReachBottom() {
    }
}
</script>

<style scoped lang="scss">
.page-wrap {
    width: 100%;
    min-height: 100vh;
	
	background-color: #F6F6F6;
}
.user-info {
	width: 100%;
	height: 384rpx;
	padding-top: 132rpx;

	background: linear-gradient(180deg, #EBCA8D 0%, #FAC76A 0%, #FFEFC2 100%);
	border-radius: 0rpx 0rpx 26rpx 26rpx;
	opacity: 1;
	box-sizing: border-box;

	.base-info {
		width: 100%;
		padding-left: 38rpx;

		display: flex;
		justify-content: flex-start;
		align-items: center;

		box-sizing: border-box;

		.profile {
			width: 100rpx;
			height: 100rpx;
			padding: 2rpx;
			margin-right: 24rpx;

			border-radius: 50%;
			overflow: hidden;
			background-color: #fff;
			box-sizing: border-box;

			& > image {
				width: 100%;
				height: 100%;
			}
		}

		.nick-name {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;

			font-size: 32rpx;
			font-weight: 800;
			color: #333333;

			.number {
				margin-top: 10rpx;

				font-weight: normal;
				font-size: 28rpx;
				color: rgba(#333333, 0.8);
			}
		}
	}
}

.container {
	width: 100%;
	padding: 0 20rpx;

	box-sizing: border-box;

	position: relative;
	top: -128rpx;


	.user-property {
		width: 100%;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.vip {
			width: 666rpx;
			height: 108rpx;
			padding: 0 36rpx 0 32rpx;

			background: linear-gradient(305deg, #CBAB78 0%, #DFBD7D 100%);
			border-radius: 26rpx 26rpx 0 0;
			box-sizing: border-box;

			display: flex;
			justify-content: space-between;
			align-items: center;

			.vip-tips {
				width: 55%;

				font-size: 28rpx;
				color: #FFFFFF;

				display: flex;
				align-items: center;

				& > image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 18rpx;
				}
			}

			.vip-btn {
				width: 116rpx;
				height: 50rpx;

				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(141,141,141,0.25);
				border-radius: 62rpx;
				text-align: center;
				line-height: 50rpx;
				font-size: 20rpx;
				font-weight: 500;
				color: #967251;
			}
		}

		.property {
			width: 100%;
			height: 156rpx;

			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 8rpx 4rpx rgba(235,235,235,0.15);
			border-radius: 24rpx 24rpx 24rpx 24rpx;

			display: flex;
			align-items: center;
			justify-content: space-between;

			.property-left {
				display: flex;
				align-items: center;

				.property-item {
					width: 158rpx;
					height: 100%;

					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					& > image {
						width: 50rpx;
						height: 40.5rpx;
						margin-bottom: 16rpx;
					}

					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
				}

				& > image {
					width: 52rpx;
					height: 140rpx;

					border-radius: 0rpx 0rpx 0rpx 0rpx;
				}
			}

			.property-right {
				width: 520rpx;
				padding-right: 70rpx;
				padding-left: 20rpx;

				display: flex;
				justify-content: space-between;
				align-items: center;

				box-sizing: border-box;

				.property-content {
					display: flex;
					flex-direction: column;
					align-items: center;

					font-size: 36rpx;
					font-weight: bold;
					color: #000000;

					& > text:nth-child(2) {
						margin-top: 26rpx;

						color: #333333;
						font-size: 24rpx;
					}
				}
			}
		}
	}

	.order-opt {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		font-size: 24rpx;
		font-weight: 500;
		color: #8A8A8A;

		& > image {
			width: 11rpx;
			height: 22rpx;
			margin-left: 14rpx;
		}
	}

	.swiper {
		width: 100%;
		height: 130rpx;
		margin-top: 38rpx;

		.swiper-item {
			width: 100%;
			height: 130rpx;
		}
	}
	.order-extra {
		width: 638rpx;
		height: 130rpx;

		background: #F8F8FA;
		border-radius: 14rpx 14rpx 14rpx 14rpx;
		overflow: hidden;

		display: flex;

		& > image {
			width: 130rpx;
			height: 130rpx;
		}

		.item-right {
			width: calc(100% - 130rpx - 34rpx);
			padding: 24rpx 0;
			margin-left: 34rpx;

			box-sizing: border-box;

			display: flex;
			flex-direction: column;

			.order-status {
				width: 100%;
				margin-bottom: 10rpx;
				
				display: flex;
				justify-content: flex-start;
				align-items: center;

				
				font-size: 24rpx;
				color: #BDBDBD;

				& > image {
					width: 11rpx;
					height: 20rpx;
					margin-left: 12rpx;
				}
			}

			.order-time {
				width: 100%;

				font-size: 28rpx;
				font-weight: bold;
				color: #333333;

				overflow:hidden;
				text-overflow:ellipsis;
				white-space:nowrap

				& > text:nth-child(2) {
					color: #FA3F35;
					margin: 0 5rpx;
				}
			}
		}
	}
}
</style>
