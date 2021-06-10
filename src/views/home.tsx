import { useStore, Dispatch } from "vuex";
import { defineComponent, ref } from "vue";
import { useRouter, Router } from "vue-router";
import { SET_USER } from "@/store/login/actionType";

import Child from "@/components/child";
import TodoList from "@/components/todoList";

import {
  ElSkeleton,
  ElDropdown,
  ElDescriptions,
  ElDropdownMenu,
  ElDropdownItem,
  ElDescriptionsItem,
} from "element-plus";

// 函数式组件
const DropdownMenu = (dispatch: Dispatch, router: Router): JSX.Element => (
  <ElDropdownMenu>
    <ElDropdownItem
      {...{
        onClick: () => {
          dispatch(`login/${SET_USER}`, {});
          localStorage.removeItem("user");
          router.push({ name: "login" });
        },
      }}
      icon="el-icon-switch-button"
    >
      退出登录
    </ElDropdownItem>
  </ElDropdownMenu>
);

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const name = ref<string>("");
    const password = ref<string>("");

    setTimeout(() => {
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        store.dispatch(`login/${SET_USER}`, user);
      }
      name.value = store.state.login.user.name;
      password.value = store.state.login.user.password.replace(/[\s\S]/g, "*");
    }, 1000);

    return () =>
      name.value ? (
        <>
          <ElDropdown
            style={{
              marginBottom: "15px",
            }}
            v-slots={{
              dropdown: DropdownMenu(store.dispatch, router),
            }}
          >
            <span>
              <i
                class="el-icon-s-tools el-icon--right"
                style={{
                  marginRight: "8px",
                }}
              ></i>
              设置
            </span>
          </ElDropdown>
          <Child
            type="primary"
            size="small"
            v-slots={{
              prefix: <i class="el-icon-star-on"></i>,
              suffix: (props: string) => <div>{props}</div>,
            }}
            onChangePswVisible={(flag) => {
              password.value = flag
                ? store.state.login.user.password
                : store.state.login.user.password.replace(/[\s\S]/g, "*");
            }}
          >
            这是一段默认插槽的内容
          </Child>
          <ElDescriptions
            title="用户信息"
            style={{
              padding: "10px 16px",
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)",
            }}
          >
            <ElDescriptionsItem
              {...{
                label: "用户名",
              }}
            >
              {name.value}
            </ElDescriptionsItem>
            <ElDescriptionsItem
              {...{
                label: "密码",
              }}
            >
              {password.value}
            </ElDescriptionsItem>
          </ElDescriptions>
          <TodoList />
        </>
      ) : (
        <ElSkeleton rows={5} animated></ElSkeleton>
      );
  },
});
