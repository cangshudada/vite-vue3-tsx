import { defineComponent, PropType, ref } from "vue";
import { ElButton } from "element-plus";

export const validatorComponentSize = (value: string): boolean =>
  ["", "large", "medium", "small", "mini"].includes(value);

export default defineComponent({
  emits: ["changePswVisible"],
  props: {
    type: {
      type: String as PropType<
        | "primary"
        | "text"
        | "success"
        | "warning"
        | "danger"
        | "info"
        | "default"
      >,
      default: "default",
    },
    size: {
      type: String as PropType<"large" | "medium" | "small" | "mini">,
      default: "medium",
      validator: (val: string) => validatorComponentSize(val),
    },
  },
  setup(props, { emit, slots }) {
    const flag = ref<boolean>(false);
    return () => (
      <div class="child">
        <ElButton
          type={props.type}
          size={props.size}
          {...{
            onClick: () => {
              flag.value = !flag.value;
              emit("changePswVisible", flag.value);
            },
          }}
        >
          {flag.value ? "隐藏密码" : "显示密码"}
        </ElButton>
        <br />
        {slots.default && slots.default()}
        <br />
        prefix插槽内容 : {slots.prefix && slots.prefix()}
      </div>
    );
  },
});
