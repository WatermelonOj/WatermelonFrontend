import {Select, Option, OptionGroup, Input, Tree, Dialog,
        Row, Col, Button, Tag , Carousel, CarouselItem,
        Form, Progress, Tabs, TabPane, Collapse, CollapseItem,
        Pagination, Link, Loading , Avatar, Icon, Badge, Card,
        Divider, Dropdown, DropdownMenu, DropdownItem, Menu,
        MenuItem, Popconfirm, Message, Popover,Upload,Image} from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(OptionGroup)
    Vue.use(Input)
    Vue.use(Tree)
    Vue.use(Dialog)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)
    Vue.use(Tag)
    Vue.use(Carousel)
    Vue.use(CarouselItem)
    Vue.use(Form)
    Vue.use(Progress)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Collapse)
    Vue.use(CollapseItem)
    Vue.use(Pagination)
    Vue.use(Link)
    Vue.use(Loading)
    Vue.use(Avatar)
    Vue.use(Icon)
    Vue.use(Badge)
    Vue.use(Card)
    Vue.use(Divider)
    Vue.use(Dropdown)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.use(Menu)
    Vue.use(MenuItem)
    Vue.use(Popconfirm)
    Vue.component(Message )
    Vue.prototype.$message = Message
    Vue.use(Popover)
    Vue.use(Upload)
    Vue.use(Image)
  }
}
export default element
