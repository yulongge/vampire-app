import { createApp } from 'vue';
import './app.scss';
import { Animate, ConfigProvider,Image,Ellipsis,Avatar,Button,Cell,CellGroup,Icon,Price,OverLay,Divider,Layout,Col,Row,ImagePreview,Sticky,Swipe,ActionSheet,BackTop,Collapse,CollapseItem,Drag,Dialog,InfiniteLoading,Notify,Range,Video,Popup,Steps,Step,Swiper,SwiperItem,Switch,Toast,Progress,CircleProgress,NoticeBar,SearchBar,Empty,Audio,List,Navbar,FixedNav,Menu,MenuItem,Tabbar,TabbarItem,Elevator,Pagination,Tabs,TabPane,Indicator,Grid,GridItem,SideNavBar,SideNavBarItem,SubSideNavBar,Calendar,Checkbox,CheckboxGroup,DatePicker,InputNumber,Input,Radio,RadioGroup,Rate,Picker,ShortPassword,TextArea,Uploader,CountUp,NumberKeyboard,CountDown,Badge,Tag,Popover,Form,FormItem,Skeleton,Cascader,Address,Barrage,Signature,TimeSelect,TimePannel,TimeDetail,Sku,Card,Table } from '@nutui/nutui-taro';
import store from "./store/index"
import { useStore } from 'vuex'
import { redirect } from '@/utils/redirect';
import { getStorageSync } from '@/utils/storage'

//这里添加用到的 nutui 组件
const nutuiComponents = [
  Animate, ConfigProvider,Image,Ellipsis,Avatar,Button,Cell,CellGroup,Icon,Price,OverLay,Divider,Layout,Col,Row,ImagePreview,Sticky,Swipe,ActionSheet,BackTop,Collapse,CollapseItem,Drag,Dialog,InfiniteLoading,Notify,Range,Video,Popup,Steps,Step,Swiper,SwiperItem,Switch,Toast,Progress,CircleProgress,NoticeBar,SearchBar,Empty,Audio,List,Navbar,FixedNav,Menu,MenuItem,Tabbar,TabbarItem,Elevator,Pagination,Tabs,TabPane,Indicator,Grid,GridItem,SideNavBar,SideNavBarItem,SubSideNavBar,Calendar,Checkbox,CheckboxGroup,DatePicker,InputNumber,Input,Radio,RadioGroup,Rate,Picker,ShortPassword,TextArea,Uploader,CountUp,NumberKeyboard,CountDown,Badge,Tag,Popover,Form,FormItem,Skeleton,Cascader,Address,Barrage,Signature,TimeSelect,TimePannel,TimeDetail,Sku,Card,Table
];

const App = createApp({
  onShow(options) { },
  mounted () {
    // const userInfo = getStorageSync('userInfo')
    // if (!userInfo?.token) {
    //   redirect({
    //     type: 'relaunch',
    //     url: '/package/mine/pages/login/index'
    //   })
    // }
  }
})


nutuiComponents.forEach(item => {
  App.use(item);
})

App.use(store)
export default App;
