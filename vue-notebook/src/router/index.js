import Vue from 'vue'
import Router from 'vue-router'

import BaseLayout from '@/components/BaseLayout.vue'
import TodoList from '@/views/TodoList.vue'
import DoneList from '@/views/DoneList.vue'
import NoteList from '@/views/NoteList.vue'
import NoteBox from '@/views/NoteBox.vue'
import Baidu from '@/views/Baidu.vue'
import UploadImage from '@/views/UploadImage.vue'
import EmojiList from '@/views/EmojiList.vue'
import EmojiBox from '@/views/EmojiBox.vue'


Vue.use(Router)

// 路由配置
export default new Router({
  routes: [
    // 主页
    {
      path: '/',
      redirect: '/note'
    }, {
      path: '/',
      name: 'BaseLayout',
      component: BaseLayout,
      children: [{
          path: '/todo',
          component: TodoList
        }, {
          path: '/done',
          component: DoneList
        }, {
          path: '/note',
          component: NoteList
        }, {
          path: '/note/:id',
          component: NoteBox
        }, {
          path: '/baidu',
          component: Baidu
        }, {
          path: '/emoji',
          component: EmojiList
        }, {
          path: '/emoji/:id',
          component: EmojiBox
        }, {
          path: '/upload',
          component: UploadImage
        }
      ]
    }
  ]
})
