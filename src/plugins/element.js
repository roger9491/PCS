import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import { Container,Aside,Menu,Submenu,MenuItem
,Form,FormItem,Input,Button,Message,Radio,RadioGroup,RadioButton,Row,Col,
DatePicker,Table,TableColumn,Popover,Divider,Popconfirm,Tree} from "element-ui";
import  VueCookies  from "vue-cookies";
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(Container);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.prototype.$message = Message;
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Row);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popover);
Vue.use(Divider);
Vue.use(DatePicker);
Vue.use(Popconfirm);
Vue.use(Tree);
Vue.use(VueCookies);