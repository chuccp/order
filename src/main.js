import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import selectField from './components/select-field.vue'
import cokeForm from './components/coke-form.vue'
import VueCookies from 'vue-cookies'

import { Switch,Sidebar, SidebarItem,Button,NavBar,Toast,ActionBar, ActionBarIcon, ActionBarButton,Col, Row,Card,Field,Cell, CellGroup,List,ConfigProvider,ActionSheet,Stepper,Divider,Picker,Dialog,Uploader  } from 'vant';

import 'vant/es/toast/style';
import 'vant/es/dialog/style';

import router from './router'
import store from "./store";
import i18n from './i18n'
import permission from './util/permission'

// import "./mock"
const app = createApp(App)
router.app = app
app.use(store)
app.use(router)
app.use(i18n)
app.use(Button)
app.use(Sidebar)
app.use(SidebarItem)
app.use(NavBar)
app.use(Toast)
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);
app.use(Col);
app.use(Row);
app.use(Card);
app.use(CellGroup);
app.use(Cell);
app.use(List);
app.use(ConfigProvider);
app.use(ActionSheet);
app.use(Field);
app.use(Stepper);
app.use(Divider);
app.use(Picker);
app.use(Dialog);
app.use(Uploader)
app.use(Switch)
app.use(VueCookies)
app.use(permission)
app.component('select-field', selectField)
app.component('coke-form', cokeForm)
app.mount('#app')
