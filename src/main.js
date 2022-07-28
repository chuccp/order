import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Button } from 'vant';
import { Sidebar, SidebarItem } from 'vant';
import { NavBar } from 'vant';
import { Toast  } from 'vant';
import { ActionBar, ActionBarIcon, ActionBarButton } from 'vant';
import 'vant/es/toast/style';
import { Col, Row } from 'vant';
import { Card } from 'vant';
import { Field } from 'vant';
import { Cell, CellGroup } from 'vant';
import { List } from 'vant';
import { ConfigProvider } from 'vant';
import { ActionSheet } from 'vant';
import { Stepper } from 'vant';
import { Divider } from 'vant';
import router from './router'
import store from "./store";
import i18n from './i18n'

const app = createApp(App)
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
app.mount('#app')
