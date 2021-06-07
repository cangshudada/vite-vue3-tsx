import { useStore } from "vuex";
import { defineComponent, ref } from "vue";
import { SET_USER } from "@/store/login/actionType";
import { ElSkeleton, ElDescriptions, ElDescriptionsItem } from "element-plus";

export default defineComponent({
  setup() {
    const name = ref<string>("");
    const password = ref<string>("");
    const store = useStore();

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
      ) : (
        <ElSkeleton rows={5} animated></ElSkeleton>
      );
  },
});
