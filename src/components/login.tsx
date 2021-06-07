import { useStore } from "vuex";
import { IUser } from "@/store/login";
import { useRouter } from "vue-router";
import { SET_USER } from "@/store/login/actionType";
import { defineComponent, ref, reactive } from "vue";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";

export default defineComponent({
  setup() {
    let data = reactive<{
      user: IUser;
    }>({
      user: {
        name: "",
        password: "",
      },
    });
    const loginForm = ref<typeof ElForm | null>(null);
    const { dispatch } = useStore();
    const router = useRouter();

    function login() {
      if (!loginForm.value) return;
      loginForm.value.validate((valid: boolean) => {
        if (valid) {
          if (data.user.name === "admin" && data.user.password === "123456") {
            router.push({
              name: "home",
            });

            dispatch(`login/${SET_USER}`, data.user);
          } else {
            data.user = {
              name: "",
              password: "",
            };
            ElMessage.error("用户名或密码错误");
          }
        } else {
          return false;
        }
      });
    }

    function keyUp({ code }: KeyboardEvent) {
      if (code === "Enter") {
        login();
      }
    }

    return () => (
      <ElForm model={data.user} ref={loginForm}>
        <ElFormItem
          label="账号"
          prop="name"
          rules={[{ required: true, message: "请输入用户名", trigger: "blur" }]}
        >
          <ElInput
            placeholder="请输入用户名"
            v-model={data.user.name}
            v-slots={{
              prefix: <i class="el-input__icon el-icon-user"></i>,
            }}
            {...{
              onKeyup: keyUp,
            }}
          ></ElInput>
        </ElFormItem>
        <ElFormItem
          label="密码"
          prop="password"
          rules={[{ required: true, message: "请输入密码", trigger: "blur" }]}
        >
          <ElInput
            placeholder="请输入密码"
            v-model={data.user.password}
            v-slots={{
              prefix: <i class="el-input__icon el-icon-unlock"></i>,
            }}
            {...{
              onKeyup: keyUp,
            }}
          ></ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElButton
            type="primary"
            {...{
              onClick: login,
            }}
          >
            登陆
          </ElButton>
        </ElFormItem>
      </ElForm>
    );
  },
});
