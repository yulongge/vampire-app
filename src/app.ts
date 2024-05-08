import { createApp } from 'vue';
import './app.scss';
import { Animate, ConfigProvider,Image,Ellipsis,Avatar,Button,Cell,CellGroup,Icon,Price,OverLay,Divider,Layout,Col,Row,ImagePreview,Sticky,Swipe,ActionSheet,BackTop,Collapse,CollapseItem,Drag,Dialog,InfiniteLoading,Notify,Range,Video,Popup,Steps,Step,Swiper,SwiperItem,Switch,Toast,Progress,CircleProgress,NoticeBar,SearchBar,Empty,Audio,List,Navbar,FixedNav,Menu,MenuItem,Tabbar,TabbarItem,Elevator,Pagination,Tabs,TabPane,Indicator,Grid,GridItem,SideNavBar,SideNavBarItem,SubSideNavBar,Calendar,Checkbox,CheckboxGroup,DatePicker,InputNumber,Input,Radio,RadioGroup,Rate,Picker,ShortPassword,TextArea,Uploader,CountUp,NumberKeyboard,CountDown,Badge,Tag,Popover,Form,FormItem,Skeleton,Cascader,Address,Barrage,Signature,TimeSelect,TimePannel,TimeDetail,Sku,Card,Table } from '@nutui/nutui-taro';
// import { Avatar,Swipe,Swiper,SwiperItem,Progress,CircleProgress,Navbar,FixedNav,Menu,MenuItem,Tabbar,TabbarItem,Tabs,TabPane } from '@nutui/nutui-taro';

//这里添加用到的 nutui 组件
const nutuiComponents = [
  Animate, ConfigProvider,Image,Ellipsis,Avatar,Button,Cell,CellGroup,Icon,Price,OverLay,Divider,Layout,Col,Row,ImagePreview,Sticky,Swipe,ActionSheet,BackTop,Collapse,CollapseItem,Drag,Dialog,InfiniteLoading,Notify,Range,Video,Popup,Steps,Step,Swiper,SwiperItem,Switch,Toast,Progress,CircleProgress,NoticeBar,SearchBar,Empty,Audio,List,Navbar,FixedNav,Menu,MenuItem,Tabbar,TabbarItem,Elevator,Pagination,Tabs,TabPane,Indicator,Grid,GridItem,SideNavBar,SideNavBarItem,SubSideNavBar,Calendar,Checkbox,CheckboxGroup,DatePicker,InputNumber,Input,Radio,RadioGroup,Rate,Picker,ShortPassword,TextArea,Uploader,CountUp,NumberKeyboard,CountDown,Badge,Tag,Popover,Form,FormItem,Skeleton,Cascader,Address,Barrage,Signature,TimeSelect,TimePannel,TimeDetail,Sku,Card,Table
  // Avatar,Swipe,Swiper,SwiperItem,Progress,CircleProgress,Navbar,FixedNav,Menu,MenuItem,Tabbar,TabbarItem,Tabs,TabPane
];

const App = createApp({
  onShow(options) { }
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})


nutuiComponents.forEach(item => {
  App.use(item);
})


export default App;
