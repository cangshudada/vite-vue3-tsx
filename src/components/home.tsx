import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value = ref<string>("");

    setTimeout(() => {
      value.value = "hello world";
    }, 1000);

    return () => (
      <>
        <div id="nav">{value.value}</div>
      </>
    );
  },
});