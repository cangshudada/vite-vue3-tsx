# Vite + Vue 3 + Typescript + tsx + less + router + vuex + elementplus 教程示范demo

> 本文为作者尝试使用vite结合vue3和tsx一步步完成todo list示范demo的心路历程整理，希望能给初学者相关踩坑指引



## 已实现的相关功能示范

- [x] typescript
- [x] vue3大部分语法示例
- [x] vite脚手架配置
- [x] tsx开发模式
- [x] less
- [x] router
- [x] vuex
- [x] Element-plus

上述功能再结合axios笔者认为大部分小项目需求都足以胜任，如果有有兴趣的同学欢迎fork代码体验一番,也欢迎各位提交issue交流。



## 为什么vue项目要抛弃SFC写法而尝试jsx/tsx方式来编码？

这个问题本人觉得有一篇博客已经总结得相当不错，我就不再多赘述相关细节，博客链接如下：

[为什么我推荐使用JSX开发Vue3](https://juejin.cn/post/6911175470255964174)

当然这也是见仁见智，每个人有自己的喜好偏见都很正常，但是多一种思路多一种方案对后期业务实现也能多一种选择。



## 为什么要写这个demo?

现前端主流框架中我又喜欢vue的双向数据绑定的机制，又喜欢react jsx语法的灵活，但这两者在vue2时代一直没能有较为完美的结合方案，所以我也一直较为遗憾。

直到vue3问世之后，越来越多开源UI组件库都在使用tsx的方式来实现相关组件业务，生态也越来越成熟，于是趁着公司业务还不繁重之际赶紧体验了一番，体验完之后简直舒爽至极，我也仿佛找到了一个完美的框架编码方式（当然这个完美仅对于我来说，毕竟每个人喜爱的框架，编码方式都不尽相同）。

我觉得目前还是有相当一部分人对该编码模式是比较感兴趣的，因为该类社区文章也很多，但是从这几天的阅读来看，目前本人还没有找到一个完整的示例demo，得每个部分单独去查找和阅读，所以基于这个现状我也总结了一篇简单的示例文章供有兴趣的小伙伴学习和阅读，希望能够帮助到各位。

下面我就结合项目创建顺序以及各个功能模块一个个说明



## 示范解析

### 涉及到的主要依赖：

1. `vue@^3.0.5`
2. `vite@^2.3.5`
3. `vue-router@4.0.8`
4. `vuex@4.0.1`
5. `typescript@^4.1.3`
6. `less@^4.1.1`
7. `@vitejs/plugin-vue-jsx@^1.1.5`
8. `element-plus@^1.0.2-beta.46`



### 项目创建

#### 准备工作

1. 确保安装`yarn`
```bash
$ npm install yarn -g
```
2. 确保安装`vite`脚手架
```bash
$ npm install -g create-vite-app
# or
$ yarn add -g create-vite-app
```



#### 创建

```bash
$ npm init @vitejs/app
# or
$ yarn create @vitejs/app
```

接着你想输入的项目名称，回车之后就会出现让你选择模版预设的选项：

<img src="https://raw.githubusercontent.com/cangshudada/vite-vue-tsx/main/public/source/1.png" alt="image-20210608173556878" style="zoom:50%;" />

可以看到预设是比较多的，官网上给出了当前支持的预设模版：

- `vanilla`
- `vanilla-ts`
- `vue`
- `vue-ts`
- `react`
- `react-ts`
- `preact`
- `preact-ts`
- `lit-element`
- `lit-element-ts`
- `svelte`
- `svelte-ts`

这里我们选择 **vue**

然后让我们接着选择 **vue-ts**，回车之后脚手架就帮我们把项目构建好了。

<img src="https://raw.githubusercontent.com/cangshudada/vite-vue-tsx/main/public/source/2.png" alt="image-20210608173943271" style="zoom:50%;" />

下面是构建完成的目录结构：

```bash
│  ├─public # 静态资源目录
│  │      favicon.ico 
│  │
│  ├─src
│  │  │  App.vue # 入口vue文件
│  │  │  main.ts # 入口文件
│  │  │  shims-vue.d.ts # vue文件模块声明文件
│  │  │  vite-env.d.ts # vite环境变量声明文件
│  │  │
│  │  ├─assets # 资源文件目录
│  │  │      logo.png
│  │  │
│  │  └─components # 组件文件目录
│  │         HelloWorld.vue
│  │
│  │ .gitignore
│  │ index.html # Vite项目的入口文件 
│  │ package.json
│  │ README.md
│  │ tsconfig.json # tsconfig配置文件
│  │ vite.config.ts # vite配置文件
```

由上面目录结构可以看到vite脚手架构建的项目目录结构还是很清晰的，装完依赖之后运行 `yarn dev`则可以看到跑起来的项目是怎样的了。当然这样的配置远不是我们需要的，所以从这里开始要进行改造了。



### 项目改造

#### tsx支持

首先需要安装官方维护的vite插件`@vitejs/plugin-vue-jsx`,这个插件其实核心还是`@vue/babel-plugin-jsx`,只是在这个插件上封装了一层供vite插件调用。所以关于vue的jsx语法规范可以直接参看`@vue/babel-plugin-jsx`,文档链接如下，建议大家可以先读一遍语法规范。官方写得比较详细，后续我也会结合实际讲解一下大部分规范的用法，[vue jsx语法规范](https://github.com/vuejs/jsx-next)。

```bash
$ npm install @vitejs/plugin-vue-jsx -D
# or
$ yarn add @vitejs/plugin-vue-jsx -D
```

安装完之后在`vite.config.ts`进行插件使用，代码如下：

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx() //插件使用
  ],
});
```

后面就可以把目录中的`app.vue`、`HelloWorld.vue`以及`shims.vue.d.ts`这三个文件删除了，因为后面我们就只需要写tsx文件了。

然后src目录下新增App.tsx文件，写入如下代码：

```tsx
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        return () => <div>hello world</div> //写一个 hello world祭天
    }
})
```

接着重新运行`yarn dev`就可以再页面上看到熟悉的hello world了。是的你没有看错，就这么简单。

这边笔者在这个时候遇到了一个小问题，就是3000端口被占了，这个时候怎么配置vite的端口配置，实际vite的官网都写得比较清楚，由于`vite.config.ts`也有相关的类型提示，所以问题解决得也很快，在`vite.config.ts`中新增一个serve对象，并设置端口就行了，此时配置如下：

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx() //插件使用
  ],
  server: {
    port: 8888
  }
});
```

> 小tip

每次书写vue3模式的tsx模板也比较麻烦，这里建议大家如果使用vscode可以添加一个自定义代码片段，这是本人日常使用的模板：

```json
{
	"Print to console": {
      "prefix": "vuetsx",
      "body": [
			"import { defineComponent } from 'vue'\n",
      "export default defineComponent({",
      "    props: {},",
			"    emits: [],",
			"    components: {},",
			"    setup(props, ctx) {",
			"        return () => <div></div>",
			"    }",
      "})",
      ],
      "description": "Create vue template"
    }
}
```



#### 配置路径别名

路径别名同样需要在`vite.config.ts`中配置，此时具体配置如下：

```typescript
import { resolve } from "path"; // 此处如果报错则安装 node/path依赖
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    port: 8888
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "/src"),
    },
  },
});
```

此时在项目中就可以直接使用新的路径别名了，使用`vscode`可能会没有路径提示，这个时候只需要在`jsconfig.json`/`tsconfig.json`配置`paths`和`baseUrl`就会出现路径提示了，具体如下：

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"],
    },
  },
  // ...
}



#### less配置

Vite 提供了对 `.scss`, `.sass`, `.less`, `.styl` 和 `.stylus` 文件的内置支持。因此没有必要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖，依赖安装完项目就可以直接解析less文件了。

```bash
$ npm install less less-loader -D
# or
$ yarn add less less-loader -D
```

> 注意这里有个坑，less 和 less-loader 需要写到 devDependencies 里面，否则运行会报错。



#### router配置

##### 安装

> 请注意，路由一定得安装4.0.0以上版本，最好直接安装当前最新版本。

查看 vue-router 版本：

```bash
$ npm info vue-router versions
```

直接安装最新版 vue-router：

```bash
$ npm install vue-router@4.0.8
# or
$ yarn add vue-router@4.0.8
```

在 src 目录下创建以下目录结构：

```bash
- src
  |- router
  |   index.ts
  |- views
  |   404.tsx
  |   login.tsx
  |   home.tsx
```



##### 配置

新版本的路由配置和之前非常相似，只有些许不同。新版本路由的API全部采用了函数式引入的方式，配合ts的类型提示，让我们无需文档也能够完成配置。

```typescript
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// 路由配置 和以前一样
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "home",
    meta: {
      type: "home",
    },
    component: () => import("@/views/home"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      type: "login",
    },
    component: () => import("@/views/login"),
  },
  {
    path: "/:pathMatch(.*)*", // 注意此处 404页面匹配规则和以前不相同，得采用这种配置方式才行
    name: "404",
    component: () => import("@/views/404"),
  },
];

// 此处由【new VueRouter】的方式修改为【createRouter】的方式 其余无变化
const router = createRouter({
  history: createWebHashHistory(), //路由模式的配置采用API调用的方式 不再是之前的字符串 此处采用的hash路由
  routes,
});

export default router;
```



##### 增加路由守卫

```typescript
// 路由守卫和之前的实现方式一致 此处只是做了一个demo仅供演示
router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
  // 获取userToken，根据业务场景可由localStorage也可由cookie中获取
  const user = localStorage.getItem("user");
  // 路由守卫判断
  if (to.meta.type === "login" && user) {
    next({ name: "home" });
    return;
  }

  if (to.meta.type === "home" && !user) {
    next({ name: "login" });
    return;
  }

  next();
});
```

现在一个vue3的基础路由就配置完成了，接着在`main.ts`这个入口文件中插件的方式通过vue引入就可以了

```typescript
import App from './App'
import router from "@/router"
import { createApp } from 'vue'

createApp(App).use(router).mount("#app");
```

此时在启动项目就可以看到地址栏已经是采用hash路由的链接了，但是这个时候还差最后一步来实现路由跳转，这就需要用到`router-view`了，这个部分跟vue2实现方式一样，这里我统一采用import的方式来实现。

```tsx
# App.tsx
import "@/assets/base.less"
import { defineComponent } from "vue";
import { RouterView } from "vue-router"; //从vue router中引入RouterView组件 实际上也可以不用引入直接使用

export default defineComponent({
  setup() {
    return () => <RouterView />;
  },
});
```



#### vuex配置



#### Element-plus引入